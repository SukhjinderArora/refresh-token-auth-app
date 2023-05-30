const router = require('express').Router();

const { isAuthenticated } = require('../middlewares/auth');

const usersController = require('../controllers/users');

router.get('/list', isAuthenticated, usersController.getUsersList);

router.get('/me', isAuthenticated, usersController.getAuthenticatedUser);

router.get('/:id', isAuthenticated, usersController.getUserById);

module.exports = router;