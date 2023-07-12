const User = require('../models/user');

// список всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// поиск конкретного пользователя
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Такого пользователя не существует' });
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// изменение профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// изменение аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};
