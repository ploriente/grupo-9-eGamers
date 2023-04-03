const User = require("../src/database/models/User.js");
const user = new User();

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailIncookie = req.cookies.userEmail;

  if (emailIncookie) {
    try {
      let userFromCookie = await user.findOne({ where: { email: emailIncookie } });
      if (userFromCookie) {
        req.session.userLogged = userFromCookie;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddleware;
