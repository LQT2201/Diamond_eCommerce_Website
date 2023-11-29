const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
const authentication = require('../app/middlewares/Authentication')


router.get('/orders-history', authentication.verifyToken, accountController.showOrders);
router.get('/wishlist-cart', authentication.verifyToken, accountController.showWishlist);
router.get('/account', authentication.verifyToken, accountController.showAccount);
router.get('/login', authentication.verifyToken, accountController.showLogin)
router.get('/register', authentication.verifyToken, accountController.showRegister)
router.get('/logout', authentication.verifyToken, accountController.logout);

router.post('/account-register', accountController.register);
router.post('/account-login', accountController.login);

module.exports = router;