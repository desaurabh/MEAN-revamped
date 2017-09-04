var mongoose = require('mongoose'),
    Schema=mongoose.Schema;

var locationSchema = new Schema({

    name: String,
    phoneOne: String,
    phoneTwo: String,
    address: {
        state: String,
        street: String,
        locality: String,
        city: String,
        country: String,
        pincode: Number
    },
    belongsTo:{
	type:mongoose.Schema.Types.ObjectId,
	ref:'company'
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        minlength: 8,
        maxlength: 150
    },
    activated: {
        type: Boolean,
        default: false
    }

});


module.exports=locationSchema;
