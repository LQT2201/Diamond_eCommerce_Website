const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authentication = require('../app/middlewares/Authentication')
// router.get('/:slug', newsController.show);

router.get('/about-us', authentication.isAuth, siteController.about);
router.get('/search', authentication.isAuth, siteController.search);
router.get('/', authentication.isAuth, siteController.index);

module.exports = router;