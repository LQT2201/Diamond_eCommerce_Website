// models/Order.js
const ObjectId = Schema.ObjectId;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    products: [{
        product_id: String,
        product_quantity: Number,
        product_size: String,
    }],
    total_quantity: Number,
    total_Price: Number,
    address: String,
  // Thêm các trường khác nếu cần
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;