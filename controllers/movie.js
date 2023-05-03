const Movie = require('../models/movie');

const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorInternalServer = require('../errors/ErrorInternalServer');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

const { errControlMessage } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
      if (error.name === errControlMessage.validationErr) {
        next(new ErrorBadRequest(errControlMessage.incorrectData));
      } else {
        next(new ErrorInternalServer(errControlMessage.serverErr));
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
        next(new ErrorForbidden(errControlMessage.filmDeletingSomeone));
      }
    })
    .catch((error) => {
      if (error.name === errControlMessage.castErr) {
        next(new ErrorBadRequest(errControlMessage.incorrectData));
      } else if (error.name === errControlMessage.documentNotFoundErr) {
        next(new ErrorNotFound(errControlMessage.movieNotFound));
      } else {
        next(new ErrorInternalServer(errControlMessage.serverErr));
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
