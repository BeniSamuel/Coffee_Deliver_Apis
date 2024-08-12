const express = require("express")
const Router = express.Router()
const ProductController = require('../../Controllers/foodProduct')
const verifyToken = require("../../Middleware/token")


Router.get("/",verifyToken,ProductController.getAllProducts)
Router.post("/",verifyToken,ProductController.createProduct)




module.exports = Router