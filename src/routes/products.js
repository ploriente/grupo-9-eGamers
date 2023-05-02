// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/products")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

// Devolver un producto 
router.get('/detail/:id/', productsController.detail);

// Crear un producto
router.get('/create/', productsController.create);
router.post('/create/', upload.single("image"), productsController.processCreate);

// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver la busqueda de productos

router.get('/search', productsController.search);

// Editar un producto
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.single("image"), productsController.processEdit);

// Eliminar un producto
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
