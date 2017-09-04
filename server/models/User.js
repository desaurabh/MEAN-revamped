var mongoose = require('mongoose');
var userSchema = require('../schemas/UserSchema');
var passportLocalMongoose = require('passport-local-mongoose');
userSchema.plugin(passportLocalMongoose);



userSchema.pre('find', function(next) {
    this.select('fName lName username email born gender role activated created');
    next();
});

userSchema.pre('findById', function(next) {
    this.populate('avatar');
    next();
});

userSchema.pre('findOne', function(next) {
    this.populate('avatar');
    next();
});





module.exports = mongoose.model('user', userSchema);
