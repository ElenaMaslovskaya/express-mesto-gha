const routerCard = require('express').Router();
const { validateCard, validateCardId } = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);

routerCard.post('/cards', validateCard, createCard);

routerCard.delete('/cards/:cardId', validateCardId, deleteCard);

routerCard.put('/cards/:cardId/likes', validateCardId, likeCard);

routerCard.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = routerCard;
