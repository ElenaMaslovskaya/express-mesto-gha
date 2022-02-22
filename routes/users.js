const routerUser = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);

routerUser.get('/users/:userId', getCurrentUser);

routerUser.post('/users', createUser);

routerUser.patch('/users/me', updateUserInfo);

routerUser.patch('/users/me/avatar', updateUserAvatar);

module.exports = routerUser;
