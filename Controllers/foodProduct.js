
const Joi = require("joi");
const FoodProduct = require("../Models/foodProduct");
const _= require("lodash");


exports.createProduct = async (req,res) => {
    try{
       

        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            manufacture: Joi.string().required()
        });

        const { error } = productSchema.validate(req.body);

        if (error) res.status(400).send(error.details[0].message);
        
        let newProduct = new FoodProduct({
            name: req.body.name,
            price: req.body.price,
            manufacture: req.body.manufacture
        });

        newProduct = await newProduct.save();

        res.status(200).send(`Product created successfully ${newProduct}`);
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Server error");
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await FoodProduct.find(); // Retrieve all products
        const filteredProducts = products.map(product => _.pick(product.toObject(), ["name", "price", "manufacture"])); // Applying lodash pick to each product
        res.status(200).send(filteredProducts); // Send filtered products as the response
    } catch (error) {
        console.log("Server error", error);
        res.status(500).send("Server error");
    }
}


exports.getAsingleProduct = async (req,res) => {
    try{
       const product = await FoodProduct.findById(req.params.id);
       if (!product) res.status(404).send("Product not Found!");

       res.status(201).send(product);
    }
    catch (error) {
        console.log("Server error",error);
        res.status(500).send("Server error");
    }
}

exports.updateProduct = async (req,res) => {
    try{
        const UpdateSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            manufacture: Joi.string().require()
        });

        const { error } = UpdateSchema.validate(req.body);
        if (error) res.status(400).send(error.details[0].message);

        const product = await FoodProduct.findByIdAndUpdate(req.params.id,{name:req.body.name,price:req.body.price,manufacture:req.body.manufacture});
        if (!product) res.status(404).send("Product not Found!");

        res.status(200).send(product);
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
}


exports.deleteProduct = async (req,res) => {
    try{
        const product = await FoodProduct.findByIdAndDelete(req.params.id);
        if (!product) res.status(404).send("Product not Found!");
        res.status(200).send(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
}