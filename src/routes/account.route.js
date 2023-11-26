const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');



router.get('/orders-history', accountController.showOrders);
router.get('/whilist-cart', accountController.showWishlist);
router.get('/account', accountController.showAccount);

module.exports = router;