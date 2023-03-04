const fs = require('fs');
const path = require('path');

const db = require("../database/models"); 


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

	// (get) Detail - Detalle de un juego
	detail: (req, res) => {
		// Do the magic
		let id = req.params.id;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productoFiltrado = products.find(producto => {
			return producto.id == id
		})

		res.render("detail", {producto: productoFiltrado})
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// (post) Create - Método para guardar la info
	processCreate: (req, res) => {
		// Do the magic
		/* Incorporar FS */
		/* Leer el archivo */
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productoNuevo = {
			/* revisar el ultimo producto, y tomar su ID. Luego sumarle 1 */
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
		/* Push */
		products.push(productoNuevo)
		/* Convertir a JSON */
		/* Escribir sobre el archivo json */
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products");
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		// Do the magic
		let id = req.params.id;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productoFiltrado = products.find(producto => {
			return producto.id == id
		})

		res.render("product-edit-form", {producto: productoFiltrado})
	},
	// (put) Update - Método para actualizar la info
	processEdit: (req, res) => {
		// Do the magic

		/* Incorporar FS */
		/* Leer el archivo */
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let id = req.params.id;
		let productoAnterior = products.find(producto => {
			return producto.id == id
		})

		let productoEditado = {
			/* dejar el id anterior */
			id: productoAnterior.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			//genre: "indefinida", req.body.category NO MODIFICAMOS ESTE DATO AUN
			description: req.body.description,
			image: req.file ? req.file.filename : productoAnterior.image,
			newGame: false, //FALTA PROGRAMAR ESTE CAMPO
			inOffer: true //FALTA PROGRAMAR ESTE CAMPO
		}
		/* Modificar el array en la posición correspondiente */
		
		let indice = products.findIndex(product => {
			return product.id == id
		})

		products[indice] = productoEditado;

		/* Convertir a JSON */
		/* Escribir sobre el archivo json */
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products");
	},

	// (delete) Delete - Eliminar un juego de la DB
	destroy : (req, res) => {
		// Do the magic
		let id = req.params.id;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productosFiltrados = products.filter(producto => {
			return producto.id != id
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, " "));

		res.redirect("/products");
	}
};

module.exports = controller;