const path = require("path")
const express = require("express")
const app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

const authRoutes = require("./routes/auth.routes")

// Use the authentication routes as middleware to handle auth-related requests
app.use(authRoutes)

app.listen(2003)