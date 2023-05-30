const createError = require('http-errors');

const { users } = require('../data/data');

const getUsersList = async (req, res, next) => {
    const usersListWithOutPassword = users.map(user => {
        const {password, ...userWithOutPassword} = user;
        return {...userWithOutPassword};
    });

    return res.status(200).json({
        data: usersListWithOutPassword
    })
};

const getAuthenticatedUser = async (req, res, next) => {
    try {
        const { userId } = req;
    
        const authenticatedUser = users.find(user => user.id == userId);
    
        if(authenticatedUser) {
            return res.status(200).json({
                data: authenticatedUser
            })
        }
    
        const error = createError.NotFound();
        throw error;

    } catch(error) {
        return next(error);
    }

};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const user = users.find(user => user.id == id);
    
        if (user) {
            return res.status(200).json({
                data: user
            })
        }
    
        const error = createError.NotFound();
        throw error;
    } catch(error) {
        return next(error);
    }
};

module.exports = {
    getUsersList,
    getAuthenticatedUser,
    getUserById
}