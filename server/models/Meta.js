var mongoose = require('mongoose');
var metaSchema = require('../schemas/MetaSchema');


module.exports=mongoose.model('meta',metaSchema);
