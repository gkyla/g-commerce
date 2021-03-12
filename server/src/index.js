const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const productsRoute = require('./routes/api/products');
require('dotenv').config();

const app = express();
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
  res.json({
    message: 'halo',
  });
});

app.use('/api', productsRoute);
