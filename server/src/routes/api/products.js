const express = require('express');
const { Router } = express;
const Product = require('../../models/Product');

const router = Router();

// Get all
router.get('/products', async (req, res) => {
  Product.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }
    res.json(docs);
  });
});

// Get an product
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  Product.findById(id, (err, doc) => {
    if (err) {
      res.status(400).json({ message: 'No Product Found' });
    }
    res.json(doc);
  });
});

// Add Product
router.post('/product', async (req, res) => {
  const product = new Product(req.body);

  try {
    const response = await product.save();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(error);
  }
});

// Delete Product
router.delete('/product/:id', async (req, res) => {
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
});

module.exports = router;
