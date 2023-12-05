const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer();
const orderController = require('../app/controllers/OrderController');
const authentication = require('../app/middlewares/Authentication');
// Hiển thị đơn hàng 
router.get('/orders', orderController.getOrders);
router.post('/order/create', authentication.isAuth, upload.none(), orderController.addOrder);
// // Hiển thị form thêm sản phẩm
// router.get('/orders/add', orderController.showAddForm);

// // Thêm sản phẩm
// router.post('/products/add', productController.addProduct);

// // Xóa sản phẩm
// router.get('/products/:id/delete', productController.deleteProduct);

module.exports = router; 