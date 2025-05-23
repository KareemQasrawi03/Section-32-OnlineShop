const path = require("path");
const express = require("express");
const db = require("./data/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const authRoutes = require("./routes/auth.routes");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Use the authentication routes as middleware to handle auth-related requests
app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(2003);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
