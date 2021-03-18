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
  console.log(req.cookies);
  if (token) {
    console.log('ada token');
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message, 'wow ini dari check user');
        // should un inject the data to front End
        next();
      } else {
        // If verified, get user info
        try {
          const user = await User.findById(decodedToken.id);

          const userFormat = {
            _id: user._id,
            email: user.email,
            token: token,
          };

          req.user = userFormat;
          next();
        } catch (error) {
          console.log(error);
          next();
        }
      }
    });
  } else {
    // should inject the data to front End
    console.log('ngga ada token');
    next();
  }
};

module.exports = { checkUser, requireAuthAccess };
