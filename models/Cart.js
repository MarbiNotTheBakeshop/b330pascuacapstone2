// Assuming this is your cart.js file
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // Define your cart schema fields here
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            qty: Number,
            price: Number,
            totalAmount: Number
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
