const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdOn: { "type": Date, "default": Date.now }

});

const Product = mongoose.model('products', productSchema);

module.exports =  Product;
