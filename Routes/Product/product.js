const express = require("express");
const Router = express.Router();
const ProductController = require('../../Controllers/foodProduct');
const verifyToken = require("../../Middleware/token");
const checkRole = require("../../Middleware/checkRole");

Router.get("/", verifyToken, ProductController.getAllProducts);
Router.post("/", verifyToken, checkRole, ProductController.createProduct);

module.exports = Router;
