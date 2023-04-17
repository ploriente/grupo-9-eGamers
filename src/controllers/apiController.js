const db = require("../database/models"); 

const controller = {
	index: (req, res) => {
        res.json({Mensaje:"Bienvenido a la API"});
    },

    products: (req, res) => {

		db.Products.findAll()
            .then(function(products){
                res.status(200).json({
                    total: products.length,
                    data: products,
                    status:200
                })
            })
	},

    detail: (req, res) => {

		db.Products.findByPk(req.params.id)
            .then(function(products){
                res.status(200).json({
                    total: products.length,
                    data: products,
                    status:200
                })
            })
    }

};

module.exports = controller;