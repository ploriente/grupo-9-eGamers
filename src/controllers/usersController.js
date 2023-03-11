const fs = require('fs')
const express = require("express");
const path = require("path");

const bcryptjs = require("bcryptjs");// para que podamos hashear contraseñas    
const { validationResult } = require("express-validator"); //express validator se requiere tantos en rutas y controlador

const User = require("../models/User")

const db = require("../database/models"); 

const usersController = {


    register: function(req, res){
     
        res.render("./users/register");
        

    },

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////    REGISTER : METODO VIEJO NO TOCAR    //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    processRegister: function (req, res){
        db.Users.create(
            {
                fullName: req.body.fullName,
                usuario: req.body.usuario,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }

        )

        return res.redirect("/users/login");
    },

    */

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


    processRegister:(req,res) =>{//capturar las validaciones de rutas
        const resultValidation = validationResult(req);
//REsult validation no es un array, es un objeto literal que tiene la propiedad errors


        console.log(resultValidation)

        if(resultValidation.errors.length > 0 ) {//quiere decir si hubiese errores
            return res.render("./users/register", {//si hay errores se vuelve a mandar el formulario
                errors: resultValidation.mapped(),//convertimos el array en un objeto literal
                oldData: req.body
            });
        }//una vez registrado sin errores
        //return res.send("Ok, las validaciones se pasaron y no tienen errores");

        db.Users.findAll({
            where: {
                email: {[db.Sequelize.Op.like]: req.body.email} 
            }
        })//Este paso es para controlar que el email no se repita
            .then(function(userInDB){

                if (userInDB){ //Validacion para verificar que este en la BD
                    return res.render("./users/register", {
                        errors:{
                            email:{
                                msg:"Este email ya se encuentra registrado"
                            }//con esto no se registra de nuevo
                        },
                        oldData: req.body
                    });
                }
            })
            db.Users.create({
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),//encritamos la contraseña
                avatar: req.file.filename//aca guardamos el enlace para que aparezca el link en avatars
            })

        return res.redirect("/users/login");  

        },
    
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////    REGISTER : METODO VIEJO NO TOCAR    //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
        /*    
            .then(function(userToCreate){

                userToCreate = {
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),//encritamos la contraseña
                    avatar: req.file.filename//aca guardamos el enlace para que aparezca el link en avatars
                }

                let userCreated = User.create(userToCreate);

                return res.redirect("/users/login");
            })
            
        //let userInDB = User.findByField("email", req.body.email);//Este paso es para controlar que el email no se repita

        console.log(userInDB)

        if (userInDB){ //Validacion para verificar que este en la BD
            return res.render("./users/register", {
                errors:{
                    email:{
                        msg:"Este email ya se encuentra registrado"
                    }//con esto no se registra de nuevo
                },
                oldData: req.body
            });
        }
        
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),//encritamos la contraseña
            avatar: req.file.filename//aca guardamos el enlace para que aparezca el link en avatars
        }

        let userCreated = User.create(userToCreate);

        return res.redirect("/users/login");
        
    

    },
    
    */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    login: function(req, res){ 
        
        res.render("./users/login")
    },

    loginProcess: (req,res) => {//Procesar el formulario //Iniciar sesion
        
        db.Users.findAll({

        where: {
            usuario: {[db.Sequelize.Op.like]: req.body.usuario} 
        }
        })
        .then(function(userToLogin){

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
                    return res.redirect("/users/profile"); // si todo es correcto
                }
                return res.render("login", {
                    errors:{
                        email : {
                            msg: "Las credenciales son invalidas" // La contraseña es incorrecta
                        }
                    }
                });
            }
            return res.render("userLoginForm", {
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

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////    LOGIN : METODO VIEJO NO TOCAR    /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/*
    loginProcess: (req,res) => {//Procesar el formulario //Iniciar sesion
        
        let userToLogin = User.findByField("email", req.body.email)

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
                return res.redirect("/users/profile"); // si todo es correcto
            }
            return res.render("login", {
                errors:{
                    email : {
                        msg: "Las credenciales son invalidas" // La contraseña es incorrecta
                    }
                }
            });
        }
        return res.render("userLoginForm", {
            errors: {
                email:{
                    msg: "No se encuentra este email en nuestra Base de Datos"
                }
            }
        });
    },

*/


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