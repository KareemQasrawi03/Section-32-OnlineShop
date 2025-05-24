const User = require("../models/users.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validtions");
function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  if (
    !validation.userDetilesAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.confirmEmail(req.body.email, req.body["confirm-email"])
  ) {
    res.redirect("/signup");
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
      const existsAlready = user.existsAlready(); // user exists 
      if (existsAlready) {
        res.redirect("/signup");
        return;
      }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }
  
  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSesstion(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  req.session.uid = null;
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
