const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards); // все карточки

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createCard
); // создание карточки

router.delete('/:cardId', deleteCardById); // удаление карточки
router.put('/:cardId/likes', likeCard); // ставим лайк
router.delete('/:cardId/likes', dislikeCard); // убираем лайк

module.exports = router;
