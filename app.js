const path = require("path");
const express = require("express");
const csrf = require("csurf");
const expressSrssion = require("express-session")
const createSessionConfig = require("./config/session")
const db = require("./data/database");
const app = express();

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorehandlerMiddelware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth")
const protectRoutesMiddleware = require('./middlewares/protect-routes')
const cartMiddleware = require("./middlewares/cart")
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices')

const authRoutes = require("./routes/auth.routes");
const baseRoute = require("./routes/base.route")
const productsRoute = require("./routes/products.route")
const adminRoutes = require("./routes/admin.routes")
const cartRouter = require("./routes/cart.routes")
const ordersRouter = require("./routes/orders.routes")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(
  "/products/assets",
  express.static("product-data")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const sessionConfig = createSessionConfig()
app.use(expressSrssion(sessionConfig))
app.use(csrf());

app.use(cartMiddleware)
// app.use(updateCartPricesMiddleware)
// Use the CSRF token middleware
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware)

// Use the authentication routes as middleware to handle auth-related requests
app.use(baseRoute);
app.use(authRoutes);
app.use(productsRoute);
app.use("/cart", cartRouter);
app.use(protectRoutesMiddleware);
app.use("/orders", ordersRouter);
app.use('/admin',adminRoutes)

app.use(errorehandlerMiddelware);

db.connectToDatabase()
  .then(function () {
    app.listen(2003);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
