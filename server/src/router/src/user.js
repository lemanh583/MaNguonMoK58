const express = require("express");
const userRoute = express.Router();
const userCtr = require("../../controllers/user")

userRoute
    .get("/list", userCtr.list)
    .get("/get/:id", userCtr.get)
    .post("/create", userCtr.create)
    .post("/update/:id", userCtr.update)
    .delete("/delete/:id", userCtr.delete)
    .post("/ban/:id", userCtr.ban)

module.exports = userRoute