const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const { login, createUser } = require('./controllers/users');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json());

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', createUser);
app.post('/signin', login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/', auth, users);
app.post('/', auth, cards);

app.use('*', (req, res) => {
  throw new NotFoundError({ message: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
