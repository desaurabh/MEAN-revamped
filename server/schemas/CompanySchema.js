var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    name: String,
    phoneOne: String,
    phoneTwo: String,
    website: String,
    address: {
        state: String,
        street: String,
        locality: String,
        city: String,
        country: String,
        pincode: Number
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cloudinary'
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
    activated:{
	type:Boolean,
	default:false
    }
    
});



module.exports=companySchema;
