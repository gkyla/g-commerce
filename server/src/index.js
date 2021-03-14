const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const productsRoute = require('./routes/api/products');
const authRoute = require('./routes/authRoute');
const { checkUser } = require('./middlewares/authMiddleware');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGGO_URI, {
    // To prevent deprecated notification
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to db'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});

app.use('*', checkUser);
app.get('/', (req, res) => {
  console.log('test');
  res.redirect('/api');
});
app.use('/api', productsRoute);
app.use('/auth', authRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));

  // Todo handling SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });
}
