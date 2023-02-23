// Middleware para evitar vistas si ya estoy loggeado

function guestMiddleware(req, res,next){
    if(req.session.userLogged){ //pregunto si alguien ya esta loggueado
        return res.redirect("/users/profile"); //redirigimos al inicio ses
    }
    next(); //si no tengo a nadie en sesion next
}

module.exports = guestMiddleware;

