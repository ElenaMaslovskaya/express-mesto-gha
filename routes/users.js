const routerUser = require('express').Router();
const { validateUserId, validateUserUpdate, validateAvatar } = require('../middlewares/validations');

const {
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/me', getCurrentUser);
routerUser.get('/users/:userId', validateUserId, getCurrentUser);
routerUser.patch('/users/me', validateUserUpdate, updateUserInfo);
routerUser.patch('/users/me/avatar', validateAvatar, updateUserAvatar);

module.exports = routerUser;
