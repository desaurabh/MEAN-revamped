var mongoose = require('mongoose'),
    locationSchema = require('../schemas').LocationSchema,
    model=mongoose.model('location',locationSchema);


module.exports=mongoose.model('location',locationSchema);;
