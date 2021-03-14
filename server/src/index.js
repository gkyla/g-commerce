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
  res.redirect('/api');
});
app.use('/api', productsRoute);
app.use('/auth', authRoute);
