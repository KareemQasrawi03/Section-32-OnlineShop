function addCsrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); // token for every sesstion
  next(); // when take token next to a another middelware
}

module.exports = addCsrfToken;
