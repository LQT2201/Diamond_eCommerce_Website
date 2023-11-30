// models/Category.js
const mongoose = require('mongoose');
const ObjectId = Schema.ObjectId;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String,
  url: String
  // Thêm các trường khác nếu cần
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;