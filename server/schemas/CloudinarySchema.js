var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var cloudinarySchema = new Schema({
    public_id: String,
    version: Number,
    width: Number,
    height: Number,
    bytes: Number,
    format: String,
    url: String,
    secure_url: String
});


module.exports = cloudinarySchema;
