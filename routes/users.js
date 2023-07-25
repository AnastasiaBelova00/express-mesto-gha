const router = require('express').Router();

const {
  userIdValidation,
  userInfoValidation,
  userAvatarValidation,
} = require('../middlewares/validation');

const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // все пользователи

router.get('/me', getCurrentUser); // текущий авторизованный пользователь

router.get('/:userId', userIdValidation, getUserById); // поиск конткретного пользователя

router.patch('/me', userInfoValidation, updateUserProfile); // изменение профиля

router.patch('/me/avatar', userAvatarValidation, updateUserAvatar); // изменение аватара

module.exports = router;
