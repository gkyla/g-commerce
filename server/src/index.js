const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'halo',
  });
});
