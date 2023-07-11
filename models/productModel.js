const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const productSchema = mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },

        quantity: {
            type: Number,
            required : true,
            default: 0,
        },

        image: {
        type: String,
        required: false,
        },
    },
    {
        timestamp: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;