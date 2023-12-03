const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const  Colection1 = new Schema({
    name:{type: String},
    createAt:{type:Date, default:Date.now},
  });

module.exports = mongoose.model('colection1', Colection1);