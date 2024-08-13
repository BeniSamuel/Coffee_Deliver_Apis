const User = require("../Models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");


exports.createUser = async (req,res) => {
    try{

      const userInformSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().valid(true, false).default(false),
      });

      const { error } = userInformSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      const user =  await User.findOne({email:req.body.email});
      if (user) return res.status(400).send("The user already exist!");

      const genSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,genSalt);

      let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
      });

      newUser = await newUser.save();

      const token = await jwt.sign({email:req.body.email},config.secretKey.jwt_secret,{expiresIn:"15d"});

      res.setHeader("x-authtoken",token);
      res.status(201).send(`user created successfully! ${newUser}`);

    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

exports.loginUser = async (req,res)=>{
    try{
           
        const LoginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })

        const {error} = LoginSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        
        const user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).send("Invalid email or Password")

        const passwordVerify = await bcrypt.compare(
            req.body.password,user.password
        )

        if (!passwordVerify) return res.status(400).send("Invalid email or Password")

        const token = jwt.sign(
            {email:user.email},
            config.secretKey.jwt_secret
        )

        res.setHeader("x-authtoken",token).send("Logged in Successfully")
    }
    catch(error){
        console.log(error)
        res.status(500).send("Server Error!")
    }
}


