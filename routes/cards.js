const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards); // все карточки
router.post('/', createCard); // создание карточки
router.delete('/:cardId', deleteCardById); // удаление карточки
router.put('/:cardId/likes', likeCard); // ставим лайк
router.delete('/:cardId/likes', dislikeCard); // убираем лайк

module.exports = router;
