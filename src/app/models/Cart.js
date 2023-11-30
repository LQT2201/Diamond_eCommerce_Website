// models/Cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
    products: [{
        product_id: String,
        product_quantity: Number,
        product_size: String,
    }],
    total_quantity: Number,
    total_Price: Number,
  
  // Thêm các trường khác nếu cần
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;