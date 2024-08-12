const express = require('express');
const Router = express.Router();
const LoginController = require("../../Controllers/auth");

Router.post("/login",LoginController.loginUser);

module.exports = Router;