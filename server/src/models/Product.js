const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const productSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  next();
});

const Product = model('product', productSchema);

module.exports = Product;
