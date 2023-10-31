const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')
const productCollection = "productos"

const productSchema = new mongoose.Schema({
    nombre:{type: String, required: true, max:100},
    categoria:{type: String, required: true, max:100},
    imagen:{type: String, required: true, max:100},
    precio:{type: Number, required: true},
    stock:{type: Number, required: true}
})
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema)

module.exports = {
    
    getProduct: async(page, limit, sort) => {
        let product = await productModel.paginate({}, { page, limit: limit, sort:{precio: sort}, lean: true })
        return product
    },
    queryProduct: async(page, limit, query) => {
        let product = await productModel.paginate({categoria: query}, { page, limit: limit, lean: true })
        return product
    },
    createProduct: async() => {
        let product = await productModel.create({ nombre, categoria, imagen, precio, stock})
        return product
    },
    updateProduct: async(id, productsToReplace) => {
        let product = await productModel.updateOne({ _id: id }, { products: productsToReplace });
        return product
    },
    deleteProduct: async(pid) => {
        let result = await productModel.deleteOne({ _id: pid })
        return result
    }
}