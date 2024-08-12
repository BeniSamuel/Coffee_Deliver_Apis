require('dotenv').config;


const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://localhost/foodDeliver")
.then(()=>{console.log("Connection made successfully")})
.catch((error)=>{console.log(error)})