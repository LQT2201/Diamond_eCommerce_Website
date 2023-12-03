const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: { 
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    tokens: [String],
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    createAt: { 
      type: Date, 
      default: Date.now
    },
  }, {
    versionKey: false
});

module.exports = mongoose.model('user', User);