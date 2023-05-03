const jwt = require('jsonwebtoken');
require('dotenv').config();

const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { errMiddlewaresMessage } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorUnauthorized(errMiddlewaresMessage.noAuthorization));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET-KEY');
  } catch (err) {
    return next(new ErrorUnauthorized(errMiddlewaresMessage.noAuthorization));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
