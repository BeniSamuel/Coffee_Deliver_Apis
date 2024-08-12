const Company = require("../Models/admin");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");


exports.createAdmin = async(req,res) => {
    try{
        
        const adminSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            admin: Joi.string()
        });

        const { error } = adminSchema.validate(req.body);

        if (error) res.status(400).send(error.details[0].message);

        const company = await Company.findOne({email:req.body.email});
        if (company) res.status(400).send("The company is already registered!");
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        let newCompany = new Company({
            companyName: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            admin: req.body.admin
        });

        newCompany = await newCompany.save();
        const token =  jwt.sign({email:req.body.email},config.secretKey.jwt_secret);

        res.status(200).setHeader("x-authAdminToken",token).send(newCompany);


    }
    catch (error) {
        console.log(error)
    }
}


exports.loginAdminUser = async(req,res)=>{
    try{

        const AdminSchema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            admin: Joi.string()
        });

        const { error } = AdminSchema.validate(req.body);
        if (error) res.status(400).send(error.details[0].message);
        
        const company = await Company.findOne({email:req.body.email});
        if (!company) res.status(400).send("Invalid email");
        
        const password = bcrypt.compare(req.body.password,company.password);
        if (!password) res.status(400).send("Invalid Password");

        const token = jwt.sign({email:req.body.email},config.secretKey.jwt_secret);

        res.status(201).setHeader("x-authAdminToken",token).send("User logged in Successfully");

    }
    catch (error) {
        console.log("Server failed due",error);
        res.status(500).send("Server Error!");
    }
}

