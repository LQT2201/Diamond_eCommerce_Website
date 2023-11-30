module.exports = {
    mutilpleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongooses.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};