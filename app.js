const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// конкретный пользователь и его id
app.use((req, res, next) => {
  req.user = {
    _id: '64ada1f4bff80fd09cd25a28',
  };

  next();
});

// // парсер для обработки
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// хелмет от уязвимостей
app.use(helmet());

// подключение роутов
app.use('/users', userRoute);
app.use('/cards', cardRoute);

// если неверный маршрут
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Такая страница не найдена' });
});

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
