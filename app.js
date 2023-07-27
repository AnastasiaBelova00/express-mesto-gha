const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const {
  userCreateValidation,
  userLoginValidation,
} = require('./middlewares/validation');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const centralError = require('./middlewares/centralError');

const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// хелмет от уязвимостей
app.use(helmet());

// подключение роутов
app.post('/signin', userLoginValidation, login);

app.post('/signup', userCreateValidation, createUser);

app.use('/users', auth, userRoute);
app.use('/cards', auth, cardRoute);

// если неверный маршрут
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});

// обработчики ошибок celebrate и миддлвара
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
