var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
    fName: {
        type: String,
        minlength: 2,
        maxlength: 30
    },
    lName: {
        type: String,
        minlength: 2,
        maxlength: 60
    },
    password: String,
    email: {
        type: String,
        minlength: 8,
        maxlength: 150
    },
    born: {
        type: Date,
        default: new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
    },
    created: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    activated: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'coordinator', 'subordinate']
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'cloudinary'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    }
});


module.exports = userSchema;
