
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    manufacture: {
        type: String,
        required: true
    }
})

const FoodProduct = mongoose.model("FoodProduct",productSchema)

module.exports = FoodProduct