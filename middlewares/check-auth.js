function checkAuthStatus(req,res,next){
  const uid = req.session.uid; //I will get it after he works login
  if (!uid) {
    return next(); //user not logedIn
  }
  // use login
  res.locals.uid = uid; //  If a user ID exists, set it in res.locals to make it available in views
  res.locals.isAuth = true; // Set a flag indicating the user is authenticated

  res.locals.isAdmin = req.session.isAdmin
  next();
}

module.exports = checkAuthStatus