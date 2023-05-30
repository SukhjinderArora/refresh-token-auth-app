const jwt = require('jsonwebtoken');

const { tokens } = require('../data/data');

const dev = process.env.NODE_ENV === 'development';

const generateJWT = (userId, secret, expirationTime) => {
    return jwt.sign(
        {
            userId,
        },
        secret,
        { expiresIn: expirationTime }
    );
}
const clearTokens = async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if (refreshToken) {
        const index = tokens.findIndex(token => token.refreshToken === refreshToken);
        if(index) {
            tokens.splice(index, 1);
        }
    }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: !dev,
        signed: true,
    });
};

module.exports = {
    generateJWT,
    clearTokens
};