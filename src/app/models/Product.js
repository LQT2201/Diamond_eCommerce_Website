const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  name: String,
  sku: {
    type: Number,
    unique: false,
  },
  brand: String,
  category: String,
  material: String,
  origin: String,
  description: String,
  price: Number,
  thumbnail: [String],
  url: String,
  slug: String,
  quantity: Number,
  sizes: [Number],
  size_title: String,
});
const Product =  mongoose.model('product', productSchema);
module.exports = Product;