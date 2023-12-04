const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const adminAuthentication = require('../app/middlewares/AdminAuthentication')


//router.get('/admin/orders', adminAuthentication.isAuth, adminController.showOrders);
router.get('/admin', adminAuthentication.isAuth, adminController.showAdmin);
router.get('/admin/login', adminAuthentication.isAuth, adminController.showAdminLogin);
router.get('/admin/logout', adminAuthentication.isAuth, adminController.logout);

router.post('/admin/register', adminAuthentication.checkOrigin, adminController.register);
router.post('/admin/login', adminController.login);

module.exports = router;