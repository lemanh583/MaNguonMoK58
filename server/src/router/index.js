const express = require("express")
const app = express()

app.use("/api/user", require("./src/user"))
app.use("/api/auth", require("./src/auth"))

module.exports = app