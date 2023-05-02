const router = require('express').Router();

const { login, createUser, tokenCheck } = require('../controllers/user');

const {
  createUsersVal,
  loginVal,
} = require('../middlewares/validate');

router.post('/signin', loginVal, login);
router.post('/signup', createUsersVal, createUser);
router.get('/check', tokenCheck);

module.exports = router;
