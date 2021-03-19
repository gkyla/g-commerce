const express = require('express');
const User = require('../models/User');
const { Router } = express;
const jwt = require('jsonwebtoken');

const router = Router();

const errorMessage = (err) => {
  const errorsMsg = { email: '', password: '' };

  if (err.message === 'Invalid Email') {
    errorsMsg.email = 'Email is Invalid or not registered';
  }

  if (err.message === 'Invalid Password') {
    errorsMsg.password = 'Password is not correct';
  }

  if (err.code === 11000) {
    errorsMsg.email = 'Email is already exists';
    return errorsMsg;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorsMsg[properties.path] = properties.message;
    });
  }
  return errorsMsg;
};

const maxAge = 60 * 60 * 24 * 3; // detik,menit,24 jam , 3 hari

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

router.get('/', (req, res) => {
  res.json(req.user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
      });

      res.status(200).json({ user: user._id });
    }
  } catch (error) {
    console.log(error);
    const getErrors = errorMessage(error);
    res.status(400).json({ errors: getErrors });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body); // Shortcut for new User(doc).save()
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id });
  } catch (error) {
    const getErrors = errorMessage(error);
    res.status(400).json({ errors: getErrors });
  }
});

router.get('/logout', (req, res) => {
  console.log('test from logout');
  res.clearCookie('jwt');
  res.json({
    message: 'cookie cleared',
  });
});

module.exports = router;
