const mongoose = require('mongoose');

async function connect(){
    
    try {
        await mongoose.connect('mongodb://127.0.0.1/Test1');
        console.log('conncet success');
    } catch (error) {
        console.log('That bai');
    }
}

module.exports = { connect };