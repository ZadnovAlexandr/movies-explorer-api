require('dotenv').config();

const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routes/index');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { errorMiddlewares } = require('./middlewares/errorMiddlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const DataBaseURL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const { PORT = 3005, DataBaseProduction = DataBaseURL } = process.env;

mongoose
  .connect(DataBaseProduction)
  .then(() => {
    console.log('DataBase connected');
  })
  .catch((err) => {
    console.log(`Error dataBase ${err}`);
  });

app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Connection on the port ${PORT}`);
});
