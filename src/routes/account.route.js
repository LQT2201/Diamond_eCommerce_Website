const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');



router.get('/orders-history', accountController.showOrders);
router.get('/wishlist-cart', accountController.showWishlist);
router.get('/account', accountController.showAccount);
router.get('/login', accountController.showLogin)
router.get('/register', accountController.showRegister)
router.post('/account-register', accountController.register);
router.post('/account-login', accountController.login);
module.exports = router;