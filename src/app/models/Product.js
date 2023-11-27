const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const  Product = new Schema({
    name:{type: String},
    createAt:{type:Date, default:Date.now},
  });

module.exports = mongoose.model('product', Product);