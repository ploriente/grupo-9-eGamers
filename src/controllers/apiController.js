const db = require("../database/models"); 

const controller = {
	index: (req, res) => {
        res.json({Mensaje:"Bienvenido a la API de eGamers"});
    },

    products: (req, res) => {

		db.Products.findAll()
            .then(function(products){
                res.status(200).json({
                    count: products.length,
                    data: products,
                    status:200
                })
            })
	},

    detail: (req, res) => {

		db.Products.findByPk(req.params.id)
            .then(function(products){
                res.status(200).json({
                    count: products.length,
                    data: products,
                    status:200
                })
            })
    },

    users: (req, res) => {

		db.Users.findAll()
            .then(function(users){
                res.status(200).json({
                    count: users.length,
                    data: users,
                    status:200
                })
            })
	},

    profile: (req, res) => {

		db.Users.findByPk(req.params.id)
            .then(function(users){
                res.status(200).json({
                    count: users.length,
                    data: users,
                    status:200
                })
            })
    }

};

module.exports = controller;