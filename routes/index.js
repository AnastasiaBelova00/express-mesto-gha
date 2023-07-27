const router = require('express').Router();

const userRoute = require('./users');
const cardRoute = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');
const {
  userCreateValidation,
  userLoginValidation,
} = require('../middlewares/validation');

const { login, createUser } = require('../controllers/users');

// подключение роутов
router.post('/signin', userLoginValidation, login);

router.post('/signup', userCreateValidation, createUser);

router.use('/users', auth, userRoute);
router.use('/cards', auth, cardRoute);

// если неверный маршрут
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});
