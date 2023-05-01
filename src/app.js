// ************ Require's ************
const express = require('express');
const session = require('express-session');
const cookies =require("cookie-parser")//guardar cookies del lado del cliente;
const path = require('path');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE


// ************ express() - (don't touch) ************
const app = express();

const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");



app.use(session({
  secret: 'super secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, path: '/' } // 1 hora
}));
app.use(cookies());

//app.use(userLoggedMiddleware);//debe ir despues de session

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(express.json()); // Para capturar el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() - (don't touch) ************
const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products
const userRouter= require("./routes/userRoutes");
const apiRouter= require("./routes/api");

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);


// ************ Set the server to listen - (don't touch) ************
app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000")
})