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

module.exports = cartModel