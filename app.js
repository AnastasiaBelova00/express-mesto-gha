const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const centralError = require('./middlewares/error');

const regExp = require('./utils/constants');

const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// хелмет от уязвимостей
app.use(helmet());

// подключение роутов
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regExp),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use('/users', auth, userRoute);
app.use('/cards', auth, cardRoute);

// если неверный маршрут
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Такая страница не найдена' });
});

// обработчики ошибок celebrate и миддлвары
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
