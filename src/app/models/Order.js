// models/Order.js
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose = require('mongoose');

const Product = require('../models/Product');

const orderSchema = new Schema({
  username: String,
  products: [Product.schema],
  total_quantity: Number,
  total_Price: Number,
  address: String,
  // Thêm các trường khác nếu cần
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;