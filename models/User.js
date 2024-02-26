const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts'
        }
    ]
});


//[SECTION] Mode
const User = mongoose.model('users', userSchema);

module.exports =  User;