const express = require("express")
const app = express()

const authRoutes = require("./routes/auth.routes")

// Use the authentication routes as middleware to handle auth-related requests
app.use(authRoutes)

app.listen(2003)