const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// список всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// поиск конкретного пользователя
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Такого пользователя не существует'));
      }
      return next(err);
    });
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.about,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с таким email уже есть в базе')
        );
      }
      return next(err);
    });
};

// изменение профиля пользователя
module.exports.updateUserProfile = (req, res, next) => {
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
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Такого пользователя не существует'));
      }
      return next(err);
    });
};

// изменение аватара пользователя
module.exports.updateUserAvatar = (req, res, next) => {
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
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Такого пользователя не существует'));
      }
      return next(err);
    });
};

// логин и проверка
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      // вернём токен
      res.status(200).send({ _id: token });
      throw new UnauthorizedError('Неверная почта и/или пароль');
    })
    .catch(next);
};

// поиск текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Такого пользователя не существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      return next(err);
    });
};
