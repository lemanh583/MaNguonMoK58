const express = require("express")
const router = express.Router()
const conversionCtr = require("../../controllers/conversion")

router
    .post("/create", conversionCtr.create)
    .get("/list/:id", conversionCtr.list)
    // .get("/list", conversionCtr.list)

module.exports = router