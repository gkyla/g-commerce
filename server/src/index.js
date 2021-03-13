const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productsRoute = require('./routes/api/products');
const authRoute = require('./routes/authRoute');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', productsRoute);
app.use('/auth', authRoute);
