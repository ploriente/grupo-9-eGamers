const fs = require('fs')
const express = require("express");
const path = require("path")


const usersController = {
    login: function(req, res){ 
        res.render("./users/login")
    },
    register: function(req, res){
        res.render("./users/register")
    },
    
}
module.exports = usersController;