const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer();
const accountController = require('../app/controllers/AccountController');
const authentication = require('../app/middlewares/Authentication')


router.get('/orders-history', authentication.isAuth, accountController.showOrders);
router.get('/wishlist-cart', authentication.isAuth, accountController.showWishlist);
router.get('/account', authentication.isAuth, accountController.showAccount);
router.get('/login', authentication.isAuth, accountController.showLogin)
router.get('/register', authentication.isAuth, accountController.showRegister)
router.get('/logout', authentication.isAuth, accountController.logout);

router.post('/buynow/:sku', authentication.isAuth, accountController.buyNow);
router.post('/account-register', accountController.register);
router.post('/account-login', accountController.login);
router.post('/change-information', authentication.isAuth, upload.none(), accountController.changeInformation);
module.exports = router;