// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = require('../models/Product');

const orderSchema = new Schema({
  username: String,
  fullname: String,
  products: [{
    product: Product.schema,
    product_quantity: {
      type: Number,
      min: 0,
    }
  }],
  total_quantity: Number,
  total_price: Number,
  address: String,
  phone: String,
  status: String,
  createAt: {
    type: Date, 
    default: Date.now,
  }
  // Thêm các trường khác nếu cần
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;