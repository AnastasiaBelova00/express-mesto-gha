const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers); // все пользователи
router.get('/:userId', getUserById); // поиск конткретного пользователя
router.post('/', createUser); // создание пользователя
router.patch('/me', updateUserProfile); // изменение профиля
router.patch('/me/avatar', updateUserAvatar); // изменение аватара

module.exports = router;
