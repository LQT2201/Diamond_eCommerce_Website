const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

// Hiển thị chi tiết sản phẩm cho user
router.get('/product-detail/:id', productController.getProductDetail);

// Hiển thị chi tiết sản phẩm cho ADMIN
router.get('/admin/products', productController.showProduct);


module.exports = router; 