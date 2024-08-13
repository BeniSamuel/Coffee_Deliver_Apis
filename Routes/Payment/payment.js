const express = require("express");
const Router = express.Router();
const {handlePayment} = require("../../Controllers/payment");


Router.post("/create-payment-intent", handlePayment);

module.exports = Router;

