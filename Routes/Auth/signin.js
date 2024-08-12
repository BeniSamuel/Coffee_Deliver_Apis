const express = require("express")
const Router = express.Router()
const authRoute = require("../../Controllers/auth")


Router.post("/signup",authRoute.createUser)

module.exports = Router