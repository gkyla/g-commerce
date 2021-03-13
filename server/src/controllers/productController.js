const Product = require('../models/Product');
const path = require('path');

module.exports.product_api_info = (req, res) => {
  res.sendFile(path.resolve('./src/views/how_to.html'));
};

module.exports.product_all = async (req, res) => {
  Product.find((err, docs) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(docs);
  });
};

module.exports.product_add = async (req, res) => {
  const product = new Product(req.body);

  try {
    const response = await product.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports.product_detail = async (req, res) => {
  const { id } = req.params;

  Product.findById(id, (err, doc) => {
    if (err) {
      res.status(400).json({ message: 'No Product Found' });
    }
    res.json(doc);
  });
};

module.exports.product_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'No Product Found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'No Product Found' });
  }
};
