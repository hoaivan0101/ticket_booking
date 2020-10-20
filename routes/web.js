const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const emailController = require('../controllers/emailController');

router.post('/', emailController.sendMail);

module.exports = router;
