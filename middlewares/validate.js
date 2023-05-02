const { Joi, celebrate } = require('celebrate');

const urlRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const createUsersVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': 'Введен некорректный email',
    }),
    password: Joi.string().required().messages({
      'any.require': 'Введен некорректный пароль',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.require': 'Введено некорректное имя пользователя',
      }),
  }),
});

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': 'Введен некорректный email',
    }),
    password: Joi.string().required().messages({
      'any.require': 'Введен некорректный пароль',
    }),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.require': 'Введено некорректное имя пользователя',
      }),
    email: Joi.string().required().email().messages({
      'any.require': 'Введен некорректный email',
    }),
  }),
});

const createMovieVal = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.require': 'Введены некорректные данные о стране создания фильма',
    }),
    director: Joi.string().required().messages({
      'any.require': 'Введены некорректные данные о режиссере фильма',
    }),
    duration: Joi.number().required().messages({
      'any.require': 'Введены некорректные данные о продолжительности фильма',
    }),
    year: Joi.string().required().messages({
      'any.require': 'Введены некорректные данные о годе выпуска фильма',
    }),
    description: Joi.string().required().messages({
      'any.require': 'Введено некорректное описание фильма',
    }),
    image: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Введена некорректная ссылка на постер к фильму',
    }),
    trailerLink: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Введена некорректная ссылка на трейлер фильма',
    }),
    thumbnail: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Введена некорректная ссылка на миниатюрное изображение постера к фильму',
    }),
    movieId: Joi.number().required().messages({
      'any.require': 'Введен некорректный id фильма',
    }),
    nameRU: Joi.string().required().messages({
      'any.require': 'Введено некорректное название фильма на русском языке',
    }),
    nameEN: Joi.string().required().messages({
      'any.require': 'Введено некорректное название фильма на английском языке',
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
