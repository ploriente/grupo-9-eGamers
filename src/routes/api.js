// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");

// ************ Controller Require ************
const apiController = require('../controllers/apiController');

router.get('/', apiController.index);
router.get('/products/', apiController.products);
router.get('/products/:id/', apiController.detail);
router.get('/users/', apiController.users);
router.get('/users/:id/', apiController.profile);


module.exports = router;