const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')
const cartCollection = "carrito"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: String,
                    ref:"productos"
                },
                quantity:{type: Number, default:1}
            }
        ],
        default: []
    },
})
cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = {
    createCart: async() => {
        let newCart = await cartModel.create({})
        return newCart
    },
    getCart: (id) => {
        let cart =  cartModel.findOne({ "_id": id}).populate("products.product").lean()
        return cart
    },
    updateCart: async(id, productsToReplace) => {
        let cart = await cartModel.updateOne({ _id: id }, { products: productsToReplace });
        return cart
    },
    findCart: async(id) => {
        let cart = await cartModel.findOne({_id: id});
        return cart
    }
}
