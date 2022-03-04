const routerUser = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', getCurrentUser);
routerUser.get('/users/me', getCurrentUser);
routerUser.patch('/users/me', updateUserInfo);
routerUser.patch('/users/me/avatar', updateUserAvatar);
module.exports = routerUser;
