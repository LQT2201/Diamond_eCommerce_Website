const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

// Định nghĩa tuyến đường cho trang giỏ hàng
router.post('/cart/add', cartController.addToCart);
router.post('/cart/remove', cartController.removeFromCart);

router.get('/cart/checkout', cartController.checkout);
router.get('/cart', cartController.getCart);


module.exports = router; 