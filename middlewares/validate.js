const { Joi, celebrate } = require('celebrate');

const { urlRegExp } = require('../utils/constants');
const { errMiddlewaresMessage } = require('../utils/constants');

const createUsersVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': errMiddlewaresMessage.incorrectEmail,
    }),
    password: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectPassword,
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.require': errMiddlewaresMessage.incorrectName,
      }),
  }),
});

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': errMiddlewaresMessage.incorrectEmail,
    }),
    password: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectPassword,
    }),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.require': errMiddlewaresMessage.incorrectName,
      }),
    email: Joi.string().required().email().messages({
      'any.require': errMiddlewaresMessage.incorrectEmail,
    }),
  }),
});

const createMovieVal = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectCountry,
    }),
    director: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectDirector,
    }),
    duration: Joi.number().required().messages({
      'any.require': errMiddlewaresMessage.incorrectDuration,
    }),
    year: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectYear,
    }),
    description: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectDescription,
    }),
    image: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': errMiddlewaresMessage.incorrectImage,
    }),
    trailerLink: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': errMiddlewaresMessage.incorrectTrailerLink,
    }),
    thumbnail: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': errMiddlewaresMessage.incorrectThumbnail,
    }),
    movieId: Joi.number().required().messages({
      'any.require': errMiddlewaresMessage.incorrectMovieId,
    }),
    nameRU: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectNameRU,
    }),
    nameEN: Joi.string().required().messages({
      'any.require': errMiddlewaresMessage.incorrectNameEN,
    }),
  }),
});

const deleteMoviedVal = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  createUsersVal,
  loginVal,
  updateUserVal,
  createMovieVal,
  deleteMoviedVal,
};
