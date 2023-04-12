// usamos este middleware para mostrar ciertas vistas que solo se ven estando loggeados

const User = require("../src/database/models/User.js");//En mayusculas

function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false; //res.locals son variables que comparto con toas las vistas
    //luego hay que modificarlas en el navBar

    let emailIncookie = req.cookies.email;
    console.log(emailIncookie)
    let userFromCookie = User.findAll({where: {
        email: emailIncookie
    }})
    .then ( function(usuario){
        console.log(usuario)
    } )

    if (userFromCookie.length > 0 ) {
        req.session.userLogged = userFromCookie;
    }
    if(req.session.userLogged) {
        res.locals.isLogger = true;
        res.locals.userLogged = req.session.userLogged; //pasando lo que tengo a nivel sesion a nivel lcoal
    }

    next();
}

module.exports = userLoggedMiddleware;


