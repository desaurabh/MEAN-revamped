var mongoose = require('mongoose');
var companySchema = require('../schemas/CompanySchema');

var model=mongoose.model('company', companySchema);

module.exports = mongoose.model('company', companySchema);;
