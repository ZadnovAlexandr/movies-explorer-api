const router = require('express').Router();
const ErrorNotFound = require('../errors/ErrorNotFound');

const userRouter = require('./user');
const movieRouter = require('./movies');
const authRouter = require('./auth');

const { auth } = require('../middlewares/auth');
const { logout } = require('../controllers/user');

router.use('/', authRouter);

router.use(auth);

router.post('/signout', logout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница по данному маршруту не найдена'));
});

module.exports = router;
