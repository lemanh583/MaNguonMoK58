const express = require("express")
const app = express()

app.use("/api/user", require("./src/user"))
app.use("/api/auth", require("./src/auth"))
app.use("/api/conversion", require("./src/conversion"))
app.use("/api/message", require("./src/message"))

module.exports = app