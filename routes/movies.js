const express = require('express');

const router = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const {
  createMovieVal,
  deleteMoviedVal,
} = require('../middlewares/validate');

router.get('/', getMovies);
router.post('/', createMovieVal, createMovie);
router.delete('/:id', deleteMoviedVal, deleteMovie);

module.exports = router;
