const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ServerError = require('../errors/ServerError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Указаны некорректные данные при создании карточки' }));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      throw new ServerError({ message: 'Произошла ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError({ message: 'Карточка не найдена' }))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: 'Недостаточно прав для выполнения операции' });
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((cardData) => {
          res.send({ data: cardData });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError({ message: 'Карточка не найдена' }))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError({ message: 'Карточка не найдена' }))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
