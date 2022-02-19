const routerUser = require('express').Router();

const User = require('../models/user');

routerUser.get('/users', (req, res) => {
  User.find({})
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
});

routerUser.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
});

routerUser.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
});

module.exports = routerUser;