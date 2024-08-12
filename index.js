require('dotenv').config()

const express = require("express")
const app = express()
const createUser = require("./Routes/Auth/signin")
const loginUser = require("./Routes/Auth/login")
const bodyParser = require("body-parser")
const ProductRoute = require("./Routes/Product/product")

// Connection MongoDB
require('./Config/db')

// MiddleWare in Application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Start Your Food Delivery")
})

// Routes in Application

app.use("/api/auth",createUser)
app.use("/api/auth",loginUser)
app.use("/api/products",ProductRoute)

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`App is running at port ${port}`)
})