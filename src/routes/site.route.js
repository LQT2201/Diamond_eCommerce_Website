const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// router.get('/:slug', newsController.show);
router.get('/about-us', siteController.about);
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;