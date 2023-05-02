const fs = require('fs');
const path = require('path');

const db = require("../database/models"); 
const { name } = require('ejs');
const { Op } = require('sequelize');




/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	// (get) Root - Mostrar todos los juegos
	index: (req, res) => {

		db.Products.findAll()
            .then(function(products){
                res.render("products", {products: products})
            })
		
		/*
		// Do the magic
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		res.render("products", {productos: products})

		*/

	},

	search: (req, res) => {

		const { search, genre, inOffer, newGame } = req.query;
		let whereClause = {
			[Op.or]: [
			  { name: { [Op.like]: `%${search}%` } },
			  { description: { [Op.like]: `%${search}%` } },
			  { genre: { [Op.like]: `%${search}%` } },
			],
		  };
		  
		  if (genre) {
			whereClause.genre = genre;
		  }
		  if (inOffer) {
			whereClause.inOffer = true;
		  }
		  if (newGame) {
			whereClause.newGame = true;
		  }
		  
		  db.Products.findAll({ where: whereClause }).then(function(products) {
			res.render("products", { products: products });
		  });

		/*
		const { search } = req.query;
  		db.Products.findAll({
    		where: {
				[Op.or]: [
				  { name: { [Op.like]: `%${search}%` } },
				  { description: { [Op.like]: `%${search}%` } },
				  { genre: { [Op.like]: `%${search}%` } },
				]
			  }
  		}).then(function(products){
			res.render("products", {products: products})
		})
		*/
		
	},

	// (get) Detail - Detalle de un juego
	detail: (req, res) => {

		db.Products.findByPk(req.params.id)
            .then(function(products){
                res.render("detail", {products: products})
            })

	/*
		// Do the magic
		let id = req.params.id;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productoFiltrado = products.find(producto => {
			return producto.id == id
		})

		res.render("detail", {producto: productoFiltrado})
	*/
	
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// (post) Create - Método para guardar la info

	processCreate: (req, res) => {
    const { name, price, discount, description, image, newGame, inOffer, players, genre } = req.body;

    let avatarFileName = "defaultImage.png";
    if (req.file) {
      avatarFileName = req.file.filename;
    }

    db.Products.create({
      name,
      price,
      discount,
      description,
      image: avatarFileName,
      newGame: newGame ? 1 : 0,
      inOffer: inOffer ? 1 : 0,
      players,
      genre,
    })
      .then((product) => {
        return res.redirect("/products");
      })

	},


/*
	processCreate: (req, res) => {
	
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productoNuevo = {
			
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			genre: "indefinida", //req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : "default-image.png",
			newGame: true, //FALTA PROGRAMAR ESTE CAMPO
			inOffer: false //FALTA PROGRAMAR ESTE CAMPO
		}
		
		products.push(productoNuevo)
		
		
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products");
	},

*/

	// (get) Update - Formulario para editar
	edit: (req, res) => {

		db.Products.findByPk(req.params.id)
            .then(function(products){
                res.render("product-edit-form", {producto: products})
            })

	},
	// (put) Update - Método para actualizar la info
	processEdit: (req, res) => {
		const { name, price, discount, description, image, newGame, inOffer, players, genre } = req.body;
	
		let avatarFileName = "defaultImage.png";
		if (req.file) {
		  avatarFileName = req.file.filename;
		}
	
		db.Products.update({
		  name,
		  price,
		  discount,
		  description,
		  image: avatarFileName,
		  newGame: newGame ? 1 : 0,
		  inOffer: inOffer ? 1 : 0,
		  players,
		  genre,
		},{
			where: {
				id: req.params.id
			}
			})
		  .then((product) => {
			return res.redirect("/products");
		  })
	
		},

	// (delete) Delete - Eliminar un juego de la DB
	destroy: (req, res) => {
	  
		db.Products.destroy({
			where: {
				id: req.params.id
			}
			})
		.then(() => {
		  return res.redirect('/products');
		})
		.catch(error => {
		  console.log(error);
		  return res.status(500).send('Error eliminando el producto');
		});
	  }
	  
};

module.exports = controller;