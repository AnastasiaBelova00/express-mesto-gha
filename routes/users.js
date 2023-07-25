const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // все пользователи

router.get('/me', getCurrentUser); // текущий авторизованный пользователь

router.get('/:userId', getUserById); // поиск конткретного пользователя

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile
); // изменение профиля

router.patch('/me/avatar', updateUserAvatar); // изменение аватара

module.exports = router;
