const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// список всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(500).send({ message: 'Ошибка на стороне сервера', err })
    );
};

// поиск конкретного пользователя
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Такого пользователя не существует' });
      }
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные пользователя' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка на стороне сервера', err });
    });
};

// создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10);
  User.create({
    name,
    about,
    avatar,
    email,
    password: bcrypt.hash,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы невалидные данные' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка на стороне сервера', err });
    });
};

// логин и проверка
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      // вернём токен
      res.status(200).send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неверный логин или пароль' });
    });
};

// изменение профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы невалидные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Такого пользователя не существует' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка на стороне сервера', err });
    });
};

// изменение аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы невалидные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Такого пользователя не существует' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка на стороне сервера', err });
    });
};

// поиск текущего пользователя
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Такого пользователя не существует' });
      }
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные пользователя' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка на стороне сервера', err });
    });
};
