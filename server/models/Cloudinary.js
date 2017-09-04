var mongoose = require('mongoose');
var cloudinarySchema = require('../schemas/CloudinarySchema');

module.exports = mongoose.model('cloudinary', cloudinarySchema);
