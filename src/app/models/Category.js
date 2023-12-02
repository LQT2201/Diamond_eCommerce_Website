// models/Category.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Product = require('../models/Product')
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  products: [Product.schema],
  // Thêm các trường khác nếu cần
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;