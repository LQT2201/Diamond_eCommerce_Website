const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const Authentication = require('../app/middlewares/Authentication');
// Hiển thị đơn hàng 
//router.get('/orders', Authentication.isAuth, orderController.getOrder);

// // Hiển thị form thêm sản phẩm
//router.get('/orders/add', orderController.showAddForm);

// // Thêm sản phẩm
// router.post('/products/add', productController.addProduct);
router.post('/orders/add', Authentication.isAuth, orderController.addOrder);
// // Xóa sản phẩm
// router.get('/products/:id/delete', productController.deleteProduct);

module.exports = router; 