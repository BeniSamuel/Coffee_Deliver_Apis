const config = require("../Config/config")
const jwt = require("jsonwebtoken")

async function verifyToken (req,res,next) {

    try{
       
        const header = req.headers.authorization
        const token = header.split(" ")[1]
        

        if (!token) res.status(400).send("No token found!")
        
        const verify = jwt.verify(token,config.secretKey.jwt_secret)
        req.user = verify.user
        next()
    }
    catch(ex){
        res.status(400).send("Invalid token!")
    }
}

module.exports= verifyToken