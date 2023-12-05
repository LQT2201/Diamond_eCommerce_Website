// models/Cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Product = require('../models/Product')
const cartSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true,
  },
  products: [{
    product: Product.schema,
    product_quantity: {
      type: Number,
      min: 0,
    }
  }],
  total_quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  total_price: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  // Thêm các trường khác nếu cần
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;