const fs = require('fs')
const express = require("express");
const path = require("path")

const { validationResult} = require("express-validator"); //express validator se requiere tantos en rutas y controlador


const usersController = {
    register: function(req, res){
        res.render("./users/register")
    },
    processRegister:(req,res) =>{//capturar las validaciones de rutas
        const resultValidation = validationResult(req);
//REsult validation no es un array, es un objeto literal que tiene la propiedad errors
        if(resultValidation.errors.length > 0 ) {//quiere decir si hubiese errores
            return res.render("./users/register", {//si hay errores se vuelve a mandar el formulario
                errors: resultValidation.mapped(),//convertimos el array en un objeto literal
                oldData: req.body
            });
        }//una vez registrado sin errores
        return res.send("Ok, las validaciones se pasaron y no tienen errores")
    },
    login: function(req, res){ 
        res.render("./users/login")
    },
    profile: (req, res) =>{
        return res.render("./users/profile")
    }
}
module.exports = usersController;