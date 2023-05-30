const router = require('express').Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

router.post(
    '/sign-up',
    authController.signUp,
    authMiddleware.generateAuthTokens
);

router.post(
    '/login',
    authController.login,
    authMiddleware.generateAuthTokens
);

router.post(
    '/logout',
    authMiddleware.isAuthenticated,
    authController.logout
);

router.post(
    '/refresh',
    authController.refreshAccessToken
);

module.exports = router;