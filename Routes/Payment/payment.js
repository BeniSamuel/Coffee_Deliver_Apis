const express = require("express");
const Router = express.Router();
const { handlePayment } = require("../../Controllers/paymentController");


Router.post("/create-payment-intent", handlePayment);

module.exports = Router;

