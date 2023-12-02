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
  products: [Product.schema],
  total_quantity: Number,
  total_price: Number,
  
  // Thêm các trường khác nếu cần
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;