const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

// Hiển thị đơn hàng 
router.get('/orders', orderController.getOrder);

// // Hiển thị form thêm sản phẩm
// router.get('/orders/add', orderController.showAddForm);

// // Thêm sản phẩm
// router.post('/products/add', productController.addProduct);

// // Xóa sản phẩm
// router.get('/products/:id/delete', productController.deleteProduct);

module.exports = router; 