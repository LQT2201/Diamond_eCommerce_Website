const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const authentication = require('../app/middlewares/Authentication')
// Hiển thị chi tiết sản phẩm cho user
router.get('/products/:slug', authentication.isAuth, productController.showProduct);

// Hiển thị chi tiết sản phẩm cho ADMIN
router.get('/admin/products', productController.adminShowProduct);

// // Hiển thị form thêm sản phẩm
// router.get('/products/add', productController.showAddForm);

// // Thêm sản phẩm
// router.post('/products/add', productController.addProduct);

// // Hiển thị form sửa sản phẩm
// router.get('/products/:id/edit', productController.showEditForm);

// // Sửa sản phẩm
// router.post('/products/:id/edit', productController.editProduct);

// // Xóa sản phẩm
// router.get('/products/:id/delete', productController.deleteProduct);


module.exports = router; 