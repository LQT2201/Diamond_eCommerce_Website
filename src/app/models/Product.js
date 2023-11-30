// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const productSchema = new Schema({
  name: String,
  sku: String,
  brand: String,
  category: String,
  description: String,
  price: Number,
  thumbnail: String,
  url: String
  // Thêm các trường khác nếu cần
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;