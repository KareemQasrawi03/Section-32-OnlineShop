function prtectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }
  next();
}

module.exports = prtectRoutes;
