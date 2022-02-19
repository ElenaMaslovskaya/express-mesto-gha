const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(routerUser);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
