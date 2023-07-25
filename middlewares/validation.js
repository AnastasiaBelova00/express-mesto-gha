const { celebrate, Joi } = require('celebrate');
const regexURL = require('../utils/constants');

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required(),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexURL),
  }),
});

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const cardCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexURL),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
});

module.exports = {
  userIdValidation,
  userInfoValidation,
  userAvatarValidation,
  userCreateValidation,
  userLoginValidation,
  cardCreateValidation,
  cardIdValidation,
};
