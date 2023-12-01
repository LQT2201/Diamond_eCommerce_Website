const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
  name: String,
  sku: {
    type: String,
    unique: true,
    index: true,
  },
  brand: String,
  category: String,
  material: String,
  origin: String,
  description: String,
  price: Number,
  thumbnail: String,
  url: String,
  slug: String,
  quantity: Number,
  sizes: [Number],
});

module.exports = mongoose.model('product', Product);