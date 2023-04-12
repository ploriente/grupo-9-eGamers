const fs = require('fs')
const express = require("express");
const path = require("path");

const bcryptjs = require("bcryptjs");    
const { validationResult } = require("express-validator");

//const User = require("../models/User")
const User = require("../database/models/User.js")
const db = require("../database/models"); 




const usersController = {
    //Registro
    register: function(req, res){
        res.render("./users/register");
    },

    //Proceso de Registro
    processRegister: function (req, res){

        const resultValidation = validationResult(req);
        console.log(validationResult);

        if (resultValidation.errors.lenght > 0){
            return res.render("./users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body 
            });
        }
        db.Users.findOne({
            where: {
                email: {[db.Sequelize.Op.like]: req.body.email}
            }
        }).then(function(userInDB){
            if(userInDB){
                return res.render("./users/register",{
                    errors:{
                        email:{
                            msg:"Este email ya se encuentra registrado"
                        }
                    },
                    oldData: req.body
                });
            }
        })

        db.Users.create({   //Users que es el alias de la tabla modelo
                fullName: req.body.fullName,
                usuario: req.body.usuario,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password,10),
                avatar: req.file.filename
            }).then(function(userCreated){
                return res.redirect("/users/login");
            })
    },
    
    ///////

    login: function(req, res){ 
        res.render("./users/login")
    },

    loginProcess: (req,res) => {//Procesar el formulario //Iniciar sesion
        db.Users.findAll({
        where: {
            email: req.body.usuario
        }
        })
        .then(function(userToLogin){
            
            if (userToLogin.length > 0) {
                let contrasenaUsuario = userToLogin[0].password;
                let isOkThePassword = bcryptjs.compareSync(req.body.password ,contrasenaUsuario);
                
                if(isOkThePassword) {
                    delete userToLogin[0].password;
                    req.session.userLogged = userToLogin;
                    //req.cookie("email", req.body.usuario, {maxAge: (1000*60)*6})
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