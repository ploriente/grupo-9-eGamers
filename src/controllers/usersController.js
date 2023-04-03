//Requires
const fs = require('fs')
const express = require("express");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator"); 
const User = require("../database/models/User.js");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

const usersController = {

    register: function(req, res){
        res.render("./users/register");
    },

    processRegister: async function(req, res){
        //Validaciones 
        await check ("fullName").notEmpty().withMessage("Tienes que escribir un nombre"),
        await check("email")
        .notEmpty().withMessage("Tienes que escribir un correo electronico").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
        await check("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
        await check("avatar").custom((value, {req}) =>{
            let file = req.file;
            let acceptedExtensions = [".jpg", ".png", ".gif"];

            if(!file) {
                throw new Error("Tienes que subir una imagen")
            } else {
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);

                }
                return true;
            }})

        let resultado = validationResult(req)

        //Verificando que no haya errores
        if(resultado.errors.length > 0 ) {//quiere decir si hubiese errores
            return res.render("./users/register", {//si hay errores se vuelve a mandar el formulario
                errors: resultado.mapped(),//convertimos el array en un objeto literal
                oldData: req.body
            });
        }

        const {fullName,usuario, email, password} = req.body

        //Verificando que el usuario no esté duplicado

        const existeUsuario = await User.findOne({where: {email}})
        if(existeUsuario) {
            return res.render("./users/register",{
                errors: {
                    email: {
                        msg:"Este email ya se encuentra registrado"
                    }                    
                },
                oldData:req.body
            })
        }
        
        User.create(
            {
                fullName: fullName,
                usuario: usuario,
                email: email,
                password: password,
                avatar: req.body.avatar
            }
        )
        return res.redirect("./users/login");
    },

    

    login: function(req, res){ 
        res.render("./users/login")
    },

    loginProcess: (req,res) => {//Procesar el formulario //Iniciar sesion
        User.findOne({
        where: {
            usuario: {[db.Sequelize.Op.like]: req.body.usuario} //req.body.usuario
        }
        })
        .then(function(userToLogin){
                console.log(userToLogin)
            if (userToLogin) {
                
                let isOkThePassword = bcryptjs.compareSync(req.body.password ,userToLogin.password);
                if(isOkThePassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
    
                    if(req.body.remember_user){
                        res.cookie("userEmail", req.body.email , {maxAge: 1000* 120})
                    }
    
                    if(req.body.remember_user) {
                        res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    return res.redirect("./users/profile"); // si todo es correcto
                }
                return res.render("./users/login", {
                    errors:{
                        email : {
                            msg: "Las credenciales son invalidas" // La contraseña es incorrecta
                        }
                    }
                });
            }
            return res.render("./users/login", {
                errors: {
                    email:{
                        msg: "No se encuentra este email en nuestra Base de Datos"
                    }
                }
            });

        })

        .then(function(user){
            res.render("./users/profile", {user: req.session.userLogged})
        })


    },



    profile: (req, res) => {
        console.log(req.cookies.userEmail)
        return res.render("profile", {
            user: req.session.userLogged
        });
    },

    logout: (req,res) => {
        res.clearCookie("userEmail");// si no se destruye la cookie de recordame queda iniciado sesion por siempre
        req.session.destroy(); //borra toda cosa que este en sesion
        return res.redirect("/");
    }
}
module.exports = usersController;