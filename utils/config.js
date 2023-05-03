require('dotenv').config();

const DataBaseURL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const { DataBaseProduction = DataBaseURL } = process.env;
const { PORT = 3005 } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;

const allowedCors = [
  'https://a.zhadnov-movies.nomoredomains.monster',
  'http://a.zhadnov-movies.nomoredomains.monster',
  'https://a.zhadnov-movies-front.nomoredomains.monster',
  'http://a.zhadnov-movies-front.nomoredomains.monster',
  'https://localhost:3005',
  'http://localhost:3005',
];

module.exports = {
  PORT,
  DataBaseProduction,
  NODE_ENV,
  JWT_SECRET,
  allowedCors,
};
