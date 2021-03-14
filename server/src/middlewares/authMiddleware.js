const User = require('../models/User');
const jwt = require('jsonwebtoken');

const requireAuthAccess = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // if error need to redirect to login page
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // need to redirect to login page
  }
};

const checkUser = (req, res, next) => {
  // Get JWT Cookie
  const { jwt: token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message, 'wow ini dari check user');
        // should un inject the data to front End
        next();
      } else {
        // If verified, get user info
        try {
          const user = await User.findById(decodedToken.id);
          console.log(user, 'test');
          next();
        } catch (error) {
          console.log(error);
        }
      }
    });
  } else {
    // should inject the data to front End
    next();
  }
};

module.exports = { checkUser, requireAuthAccess };
