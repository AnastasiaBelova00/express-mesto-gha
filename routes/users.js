const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // все пользователи
router.get('/:userId', getUserById); // поиск конткретного пользователя
router.patch('/me', updateUserProfile); // изменение профиля
router.patch('/me/avatar', updateUserAvatar); // изменение аватара
router.get('/me', getCurrentUser); // изменение профиля

module.exports = router;
