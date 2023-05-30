const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const ms = require('ms');

const { generateJWT } = require('../utils/auth');

const { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

const dev = NODE_ENV === 'development';

const { users, tokens } = require('../data/data');

const generateAuthTokens = async (req, res, next) => {
    try {
        const user = users.find(user => user.id === req.userId);

        const refreshToken = generateJWT(
            req.userId,
            REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_LIFE
        );

        const accessToken = generateJWT(
            req.userId, 
            ACCESS_TOKEN_SECRET, 
            ACCESS_TOKEN_LIFE
        );

        const token = {
            refreshToken,
            userId: req.userId,
            expirationTime: new Date(Date.now() + ms(REFRESH_TOKEN_LIFE)).getTime(),
        };

        tokens.push(token);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !dev,
            signed: true,
            expires: new Date(Date.now() + ms(REFRESH_TOKEN_LIFE)),
        });

        const expiresAt = new Date(Date.now() + ms(ACCESS_TOKEN_LIFE));

        return res.status(200).json({
            user,
            token: accessToken,
            expiresAt,
        });
    } catch (error) {
        return next(error);
    }
};


const isAuthenticated = async (req, res, next) => {
    try {
        const authToken = req.get('Authorization');
        const accessToken = authToken?.split('Bearer ')[1];
        if (!accessToken) {
            const error = createError.Unauthorized();
            throw error;
        }

        const { signedCookies = {} } = req;

        const { refreshToken } = signedCookies;
        if (!refreshToken) {
            const error = createError.Unauthorized();
            throw error;
        }

        let refreshTokenInDB = tokens.find(token => token.refreshToken === refreshToken);
        
        if (!refreshTokenInDB) {
            const error = createError.Unauthorized();
            throw error;
        }

        refreshTokenInDB = refreshTokenInDB.refreshToken;

        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        } catch (err) {
            const error = createError.Unauthorized();
            return next(error);
        }

        const { userId } = decodedToken;

        const user = users.find(user => user.id == userId);
        if (!user) {
            const error = createError.Unauthorized();
            throw error;
        }

        req.userId = user.id;
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    generateAuthTokens,
    isAuthenticated
}