'use strict';
var User = require('../models/User'),
    Cloudinary = require('../models/Cloudinary'),
    mongoose = require('mongoose'),
    util = require('../utils'),
    UserController;
var Base64 = require('../utils/Base64');

function UserController(req, res, company) {
    this.req = req;
    this.res = res;
    this.user = new User(req.body.user);
    if (typeof company !== 'undefined')
        this.user.company = company;
    if (typeof req.user !== 'undefined')
        this.user.company = req.user.company;
}



UserController.prototype.validate = function(code, cb) {
    User.findById(mongoose.Types.ObjectId(Base64.decode(code)), function(err, data) {
        if (err) cb(err, false);
        else {
            data.activated = true;
            data.save(function(err, data) {
                if (err) cb(err, false);
                else cb(data, true);
            });
        }
    });
};


UserController.prototype.save = function(callback) {
    var req, res;
    req = this.req;
    res = this.res;
    if (this.user.password === "" || typeof this.user.password === 'undefined') {
        this.user.password = util.common.addNewToken(6);

    }
    User.register(new User({
        username: this.user.email,
        role: this.user.role,
        fName: this.user.fName,
        lName: this.user.lName,
        born: this.user.born,
        email: this.user.email,
        company: this.user.company,
        gender: this.user.gender
    }), this.user.password, callback);
};

UserController.prototype.delete = function(callback) {

};

UserController.prototype.update = function(callback) {

};

UserController.prototype.addProfilePic = function(callback) {
    var file = this.req.files.file;
    var user = this.req.user;
    var updateAvatar = function(cloudinary, callback) {
        user.avatar = cloudinary;
        user.save(function(err, data) {
            if (err) callback(err, false);
            else callback(data, true);
        });

    };
    if (typeof file !== 'undefined') {
        util.cloudinary.upload(file.path, function(cloudinary) {
            if (typeof user.avatar !== 'undefined') {
                //remove old cloudinary
                util.cloudinary.delete(user.avatar, function(data, state) {
                    if (!state) callback(data, state);
                    else {
                        updateAvatar(cloudinary, callback);
                    }
                });
            } else updateAvatar(cloudinary, callback);
        });
    } else callback("File not found", false);
};


module.exports = UserController;
