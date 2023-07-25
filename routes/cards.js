const router = require('express').Router();

const {
  cardCreateValidation,
  cardIdValidation,
} = require('../middlewares/validation');

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards); // все карточки

router.post('/', cardCreateValidation, createCard); // создание карточки

router.delete('/:cardId', cardIdValidation, deleteCardById); // удаление карточки

router.put('/:cardId/likes', cardIdValidation, likeCard); // ставим лайк

router.delete('/:cardId/likes', cardIdValidation, dislikeCard); // убираем лайк

module.exports = router;
