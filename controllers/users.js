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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

// изменение профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
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
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
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
