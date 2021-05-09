const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    validate: [isEmail, 'Invalid email address'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Minimum length is 6 character'],
  },
  admin: {
    type: Boolean
  }
});

userSchema.pre('save', async function (next) {
  console.log(this);
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); // find one document
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Invalid Password');
  }
  throw Error('Invalid Email');
};

const User = model('user', userSchema);

module.exports = User;
