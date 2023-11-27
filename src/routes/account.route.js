const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');



router.get('/orders-history', accountController.showOrders);
router.get('/wishlist-cart', accountController.showWishlist);
router.get('/account', accountController.showAccount);
router.get('/login', accountController.login)
router.get('/signup', accountController.signup)
module.exports = router;