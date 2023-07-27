const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const route = require('./routes/route');

const centralError = require('./middlewares/centralError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// хелмет от уязвимостей
app.use(helmet());

// подключение роутов
app.use(route);

// обработчики ошибок celebrate и миддлвара
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
