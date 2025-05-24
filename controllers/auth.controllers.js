const User = require("../models/users.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validtions");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req); //same -> req.sesstion.flashData

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const entredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
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
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessege:
          "Please Check Your Input. Password must be at least 6 characters long, postal code must be 5 characters long",
        ...entredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
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
    if (!existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessege: "User Exists Already! Try Logging in insted!",
          ...entredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
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
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
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
  const sessionErrorData = {
    errorMessege:
      "Inviled credentiels - please double-check your email and password!",
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
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
