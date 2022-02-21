const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};