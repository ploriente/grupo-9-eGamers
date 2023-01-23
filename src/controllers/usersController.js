const fs = require('fs')
const express = require("express");
const path = require("path")


const usersController = {
    login: function(req, res){
        let login = path.join(__dirname, "/users/login.ejs")
        res.render(login)
    },
    register: function(req, res){
        let register = path.join(__dirname, "/users/register.ejs")
        res.render(register)
    },
    
}
module.exports = usersController;