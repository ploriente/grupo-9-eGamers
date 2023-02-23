// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);


/* Quiten el comentario y editen según el enunciado

router.???('/search', mainController.search);

*/

module.exports = router;
