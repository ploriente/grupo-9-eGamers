
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

   users: async function (req, res)  {
        try {
            let users = await db.Users.findAll()
            let usersData = users.map(function (user) {
               let userObj = 
               {
                id : user.id,
                fullName: user.fullName,
                usuario: user.usuario,
                email: user.email,
                avatar: user.avatar
               }
               return userObj
            }
       )
          
            res.status(200).json({
                    count: usersData.length,
                    data: usersData,
                    status:200
            
                })

        } catch (error) {
            console.log(error);
        }
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