const routerUser = require('express').Router();
const { validateId, validateUserUpdate, validateAvatar } = require('../middlewares/validations');

const {
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', validateId, getCurrentUser);
routerUser.get('/users/me', getCurrentUser);
routerUser.patch('/users/me', validateUserUpdate, updateUserInfo);
routerUser.patch('/users/me/avatar', validateAvatar, updateUserAvatar);

module.exports = routerUser;
