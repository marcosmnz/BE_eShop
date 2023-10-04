const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    cart: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    state: {
        type: Boolean,
        default: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)