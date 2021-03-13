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
});

userSchema.pre('save', function (next) {
  console.log(this);
});

const User = model('user', userSchema);

module.exports = User;
