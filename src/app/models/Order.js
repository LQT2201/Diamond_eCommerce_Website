// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = require('../models/Product');

const orderSchema = new Schema({
  username: String,
  products: [{
    product: Product.schema,
    product_quantity: {
      type: Number,
      min: 0,
    }
  }],
  status: String,
  total_quantity: Number,
  total_Price: Number,
  address: String,
  // Thêm các trường khác nếu cần
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;