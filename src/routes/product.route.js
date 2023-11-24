const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

// router.get('/:slug', newsController.show);
router.get('/', productController.index);

module.exports = router;