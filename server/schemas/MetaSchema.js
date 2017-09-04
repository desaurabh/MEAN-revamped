var mongoose = require('mongoose'),
    Schema=mongoose.Schema;

var metaSchema = new Schema({
    name: String,
    type: String,
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports=metaSchema;
