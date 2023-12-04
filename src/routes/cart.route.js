const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');
const authentication = require('../app/middlewares/Authentication')
// Định nghĩa tuyến đường cho trang giỏ hàng
router.post('/cart/add', authentication.isAuth, cartController.addToCart);
router.post('/cart/remove', authentication.isAuth, cartController.removeFromCart);

router.get('/cart/checkout', authentication.isAuth, cartController.checkout);
router.get('/cart', authentication.isAuth, cartController.getCart);


module.exports = router; 