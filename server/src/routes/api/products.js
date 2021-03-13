const express = require('express');
const { Router } = express;
const productController = require('../../controllers/productController');

const router = Router();

router.get('/', productController.product_api_info);

// Get all
router.get('/products', productController.product_all);

// Get an product
router.get('/product/:id', productController.product_detail);

// Add Product
router.post('/product/add', productController.product_add);

// Delete Product
router.delete('/product/:id', productController.product_delete);

module.exports = router;
