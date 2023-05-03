const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/user');
const { STATUS_OK, STATUS_CREATED } = require('../errors/errors');

const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorInternalServer = require('../errors/ErrorInternalServer');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorConflict = require('../errors/ErrorConflict');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { errControlMessage } = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new ErrorNotFound(errControlMessage.userNotFound));
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((error) => {
      if (error.name === errControlMessage.validationErr) {
        next(new ErrorBadRequest(errControlMessage.incorrectData));
      } else if (error.name === errControlMessage.documentNotFoundErr) {
        next(new ErrorNotFound(errControlMessage.userNotFound));
      } else if (error.code === 11000) {
        next(new ErrorConflict(errControlMessage.duplicateEmail));
      } else {
        next(new ErrorInternalServer(errControlMessage.serverErr));
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((users) => res.status(STATUS_CREATED).send({
      name: users.name,
      email: users.email,
    }))
    .catch((error) => {
      if (error.name === errControlMessage.validationErr) {
        next(new ErrorBadRequest(errControlMessage.incorrectData));
      } else if (error.code === 11000) {
        next(new ErrorConflict(errControlMessage.duplicateEmail));
      } else {
        next(new ErrorInternalServer(errControlMessage.serverErr));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        return next(new ErrorUnauthorized(errControlMessage.autorizationErr));
      }
      const data = await bcrypt.compare(password, user.password);
      if (data) {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET-KEY', {
          expiresIn: '7d',
        });
        return res
          .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: NODE_ENV === 'production' ? true : 'none',
          })
          .send({ message: errControlMessage.loginCompleted });
      }
      return next(new ErrorUnauthorized(errControlMessage.autorizationErr));
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? true : 'none',
        secure: true,
      })
      .send({ message: errControlMessage.logOut });
  } catch (error) {
    next(error);
  }
};

const tokenCheck = (req, res) => {
  const token = req.cookies.jwt;

  try {
    jwt.verify(token, JWT_SECRET);

    res.send({ authorized: true });
  } catch (err) {
    res.send({ authorized: false });
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  login,
  logout,
  tokenCheck,
};
