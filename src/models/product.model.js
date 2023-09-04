const mongoose = require("mongoose")

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    nombre:{type: String, required: true, max:100},
    categoria:{type: String, required: true, max:100},
    imagen:{type: String, required: true, max:100},
    precio:{type: Number, required: true},
    stock:{type: Number, required: true}
})

const productModel = mongoose.model(productCollection, productSchema)

module.exports = { productModel }