const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const authentication = require('../app/middlewares/Authentication')
// Hiển thị chi tiết sản phẩm cho user
router.get('/products/:slug', authentication.isAuth, productController.showProduct);

// Hiển thị chi tiết sản phẩm cho ADMIN
router.get('/admin/products', productController.adminShowProduct);


module.exports = router; 