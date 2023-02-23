// Evaluar que se este loggeado antes de pasar a profile

function authMiddleware(req, res, next) {
    if(!req.session.userLogged){// si no esta autenticado vaya a login
        return res.redirect ("/users/login");
    }
    next (); // Si esta autenticado prosiga

}
module.exports = authMiddleware