'use strict';
var Company = require('../models/Company');
var UserController = require('./UserController');
var cloudinaryUtil = require('../utils/Cloudinary');
var Cloudinary = require('../models/Cloudinary');
var mongoose = require('mongoose');
var Base64 = require('../utils/Base64');
var User = require('../models/User');

function CompanyController(req, res) {
    this.req = req;
    this.res = res;
};

CompanyController.prototype.validate = function(code, cb) {
    Company.findById(mongoose.Types.ObjectId(Base64.decode(code)), function(err, data) {
        if (err) cb(err, false);
        //if not activated
        else {
            data.activated = true;
            data.save(function(err, data) {
                if (err) cb(err, false);
                else {
                    User.find({
                        type: 'admin',
                        company: data
                    }, function(err, data) {
                        if (err) cb(err, false);
                        else {
                            data.activated = true;
                            data.save(function(err, data) {
                                if (err) cb(err, false);
                                else cb(data, true);
                            });
                        }

                    });
                }
            });
        }


    });
};

CompanyController.prototype.save = function(callback) {
    var req, res;
    req = this.req;
    res = this.res;
    var company = new Company(req.body.company);
    company.logo = new Cloudinary();
    company.save(function(err, company) {
        if (err) callback(err, false);
        else {
            var uc = new UserController(req, res, company);
            uc.save(function(err, user) {
                if (err) {
                    //revert transaction delete company
                    company.remove(function(err) {
                        if (err) callback("User is not saved & Unable to rever transaction", false);
                    });
                } else {
                    callback(user, true);
                }
            });
        }
    });

};



CompanyController.prototype.delete = function() {

};



CompanyController.prototype.update = function() {

};



module.exports = CompanyController;
