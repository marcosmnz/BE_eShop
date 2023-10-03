const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name for product is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Description for product is required"]
    },
    price: {
        type: Number,
        required: [true, "Price for product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity for product is required"]
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Product', productSchema)