const urlRegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const errControlMessage = {
  incorrectData: 'Переданы некорректные данные',
  serverErr: 'На сервере произошла ошибка',
  validationErr: 'ValidationError',
  filmDeletingSomeone: 'Вы не можете удалить фильм, созданный другим пользователем',
  castErr: 'CastError',
  documentNotFoundErr: 'DocumentNotFoundError',
  movieNotFound: 'Фильм с указанным id не найден',
  userNotFound: 'Пользователь не найден',
  duplicateEmail: 'Пользователь с данным email уже зарегистрирован',
  autorizationErr: 'Неправильные почта или пароль',
  loginCompleted: 'Вход выполнен!',
  logOut: 'Выход',
};

const errMiddlewaresMessage = {
  noAuthorization: 'Необходима авторизация',
  incorrectEmail: 'Введен некорректный email',
  incorrectPassword: 'Введен некорректный пароль',
  incorrectName: 'Введено некорректное имя пользователя',
  incorrectCountry: 'Введены некорректные данные о стране создания фильма',
  incorrectDirector: 'Введены некорректные данные о режиссере фильма',
  incorrectDuration: 'Введены некорректные данные о продолжительности фильма',
  incorrectYear: 'Введены некорректные данные о годе выпуска фильма',
  incorrectDescription: 'Введено некорректное описание фильма',
  incorrectImage: 'Введена некорректная ссылка на постер к фильму',
  incorrectTrailerLink: 'Введена некорректная ссылка на трейлер фильма',
  incorrectThumbnail: 'Введена некорректная ссылка на миниатюрное изображение постера к фильму',
  incorrectMovieId: 'Введен некорректный id фильма',
  incorrectNameRU: 'Введено некорректное название фильма на русском языке',
  incorrectNameEN: 'Введено некорректное название фильма на английском языке',
};

const errModelsMessage = {
  validImage: 'Введите корректный адрес постера к фильму',
  validTrailerLink: 'Введите корректный адрес трейлера к фильму',
  validThumbnail: 'Введите корректный адрес миниатюрного постера к фильму',
  validEmail: 'Введите корректный адрес электронной почты',
};

const errRoutesMessage = {
  pageNotFound: 'Страница по данному маршруту не найдена',
};

module.exports = {
  urlRegExp,
  errControlMessage,
  errMiddlewaresMessage,
  errModelsMessage,
  errRoutesMessage,
};
