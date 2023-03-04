const fs = require('fs');
const path = require('path');

const db = require("../database/models"); 


/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		// Do the magic
		const productosLeidos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let productosNuevosFiltrados = productosLeidos.filter( producto => {
			return producto.newGame == true
		})

		let productosEnOfertaFiltrados = productosLeidos.filter( producto => {
			return producto.inOffer == true
		})

		res.render("index", {
			productosNuevos: productosNuevosFiltrados, 
			productosEnOferta: productosEnOfertaFiltrados
			}
		);
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
