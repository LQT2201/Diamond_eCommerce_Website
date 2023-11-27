const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');



router.get('/login', authController.showLoginForm);
router.get('/register', authController.showRegisterForm);

module.exports = router;

module.exports = router;