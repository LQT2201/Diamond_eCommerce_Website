const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin = new Schema({
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
    token: {
      type: String,
    },
    createAt: { 
      type:Date, 
      default:Date.now
    },
  }, {
    versionKey: false
});

module.exports = mongoose.model('admin', Admin);