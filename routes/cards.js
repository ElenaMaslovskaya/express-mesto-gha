const routerCard = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);

routerCard.post('/cards', validateCard, createCard);

routerCard.delete('/cards/:cardId', validateId, deleteCard);

routerCard.put('/cards/:cardId/likes', validateId, likeCard);

routerCard.delete('/cards/:cardId/likes', validateId, dislikeCard);

module.exports = routerCard;
