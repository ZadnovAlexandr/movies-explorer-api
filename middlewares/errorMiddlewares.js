const { errControlMessage } = require('../utils/constants');

const errorMiddlewares = ((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: errControlMessage.serverErr });
    next();
  } else {
    res.status(statusCode).send({ message: err.message });
    next();
  }
});

module.exports = { errorMiddlewares };
