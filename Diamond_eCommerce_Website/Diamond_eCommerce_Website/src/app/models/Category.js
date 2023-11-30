// models/Category.js
const ObjectId = Schema.ObjectId;
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String
  // Thêm các trường khác nếu cần
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;