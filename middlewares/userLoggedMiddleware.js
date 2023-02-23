// usamos este middleware para mostrar ciertas vistas que solo se ven estando loggeados

const User = require("../src/models/User");//En mayusculas

function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false; //res.locals son variables que comparto con toas las vistas
    //luego hay que modificarlas en el navBar

    let emailIncookie = req.cookies.userEmail;
    let userFromCookie = User.findByField("email", emailIncookie);//importante para el boton recordame

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }
    if(req.session.userLogged) {
        res.locals.isLogger = true;
        res.locals.userLogged = req.session.userLogged; //pasando lo que tengo a nivel sesion a nivel lcoal
    }

    next();
}

module.exports = userLoggedMiddleware;
