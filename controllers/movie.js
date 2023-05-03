const Movie = require('../models/movie');

const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorInternalServer = require('../errors/ErrorInternalServer');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else {
        next(new ErrorInternalServer('На сервере произошла ошибка'));
      }
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  Movie.findById(id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        Movie.findByIdAndDelete(id)
          .then((m) => {
            res.send(m);
          })
          .catch(next);
      } else {
        next(
          new ErrorForbidden(
            'Вы не можете удалить фильм, созданный другим пользователем',
          ),
        );
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new ErrorNotFound('Фильм с указанным id не найден'));
      } else {
        next(new ErrorInternalServer('На сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
