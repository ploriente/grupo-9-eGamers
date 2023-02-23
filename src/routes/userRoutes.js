
//requires
const express = require("express");
const router =express.Router()

const path = require("path")//Este metododo contiene extname
const multer = require("multer")// metodo para generar middlewares

const {body} =require("express-validator")// body es una función dentro del paquete express-validator

const storage = multer.diskStorage({//disco donde se almacenara la informacion consta de estas dos propiedades con parametros
    destination: (req, file, cb) =>{
        cb(null, "./public/images/avatars")//guardamos img usuarios aca
    },
    filename: (req,file, cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null,fileName);
    }
});

//Middlewares
const uploadFile = multer({storage});//constante para generar el método a subir
//storage necesita multer para subir el archivo

const usersController= require("../controllers/usersController");

//En validation creo todas las validaciones y la paso a las rutas de abajo para poder procesar los archivos;
const validations = [
    body("fullName").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("usuario").notEmpty().withMessage("Tienes que escribir un usuario"),
    body("email")//bail corta las validaciones si no cumple con la primera
        .notEmpty().withMessage("Tienes que escribir un correo electrónico").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
  
    body("avatar").custom((value, {req}) =>{//suncion que anailiza el tipo de imagen
        let file = req.file;
        let acceptedExtensions = [ ".jpg", ".png", ".git"];

        if(!file){
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileExtension = path.extname(file.originalname); //cuando obtengo un archivo
            if(!acceptedExtensions.includes(fileExtension)) {//valido el tipo de ese archivo
                throw new Error(`Las extenciones de archivo permitidas son  ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]
const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware")


//Formulario de registro
router.get("/register",guestMiddleware ,usersController.register)

//Procesar el registro ///Agregando validations indicamos las condiciones de arriba
router.post("/register", uploadFile.single("avatar"), validations, usersController.processRegister)
//todo esto para procesar enctype multiform part data

//Formulario de login
router.get("/login", guestMiddleware ,usersController.login);

//Procesar el login
router.post("/login", usersController.loginProcess);

//Perfil de Usuario
router.get("/profile/:userId",authMiddleware, usersController.profile);

//Logout
router.get("/logout", usersController.logout);


module.exports = router;