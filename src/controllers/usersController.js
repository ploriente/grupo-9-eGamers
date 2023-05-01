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

    // Proceso de Registro
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

        let avatarFileName;
        if (req.file) {
        avatarFileName = req.file.filename;
        } else {
        avatarFileName = "defaulImage.png"; // o un valor predeterminado para indicar que no hay archivo
        }

        db.Users.create({
            fullName: req.body.fullName,
            usuario: req.body.usuario,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password,10),
            avatar: avatarFileName
        }).then(function(userCreated){
            return res.redirect("/users/login");
        })
    })
},
    
    ///////

    login: function(req, res){ 
        res.render("./users/login")
    },

/*
db.Products.findByPk(req.params.id)
            .then(function(products){
                res.render("detail", {products: products})
            })
*/

    loginProcess: (req,res) => {//Procesar el formulario //Iniciar sesion
        db.Users.findAll({
        where: {
            email: req.body.email
        }
        })
        .then(function(userToLogin){

            console.log(req.body)
            //console.log(userToLogin)


            if (userToLogin.length > 0) {
                let contrasenaUsuario = userToLogin[0].password;

                console.log(userToLogin[0].password)
                console.log(req.body.password)

                let isOkThePassword = bcryptjs.compareSync(req.body.password ,userToLogin[0].password);
                console.log(isOkThePassword)


                if(isOkThePassword) {
                    delete userToLogin[0].password;

                    //console.log(userToLogin[0])

                    req.session.userLogged = {
                        id: userToLogin[0].id,
                        user: userToLogin[0].usuario,
                        fullName: userToLogin[0].fullName,
                        email: userToLogin[0].email,
                        avatar: userToLogin[0].avatar
                      };

                      
                    //let  userLoggeado = req.session.userLogged;
                    console.log(req.session.userLogged)
                    //console.log(userToLogin)
                    //req.cookie("email", req.body.usuario, {maxAge: (1000*60)*6})
                    //return res.redirect("./profile"); // si todo es correcto
                    //let userLoggeado = req.session.userLogged;
                    return res.render('users/profile', { userLogged: req.session.userLogged }); // si todo es correcto
                    //return res.render('users/profile', { userLogged: userLoggeado });
                    
                    
                    
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

    /*
    function authMiddleware(req, res, next) {
    if(!req.session.userLogged){// si no esta autenticado vaya a login
        return res.redirect ("/users/login");
    }
    next (); // Si esta autenticado prosiga

}

    */


    /*
    profile: (req, res) => {

        if(req.session.userLogged){// si esta autenticado vaya a login
        //    return res.redirect ("/users/login");
        return res.render('users/profile', { userLogged: req.session.userLogged });
        }

        //res.render('./users/profile', { userLogged: req.session.userLogged }); // si todo es correcto
    },

    */


    profile: (req, res) => {
    
        if (req.session.userLogged) {
            return res.render('users/profile', { userLogged: req.session.userLogged });
          } else {
            // Usuario no autenticado, redirigir a la página de inicio de sesión
            res.redirect('/login');
          }
        },

          logout: (req, res) => {
            delete req.session.userLogged;
            console.log('Sesión cerrada correctamente');
            res.redirect('/');
        }
    }
module.exports = usersController;