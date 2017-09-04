var cloudinary = require('cloudinary');
var Cloudinary = require('../models/Cloudinary');

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});



module.exports = {
    upload: function(file, cb) {
        cloudinary.uploader.upload(file, function(result) {
            var cloudinary = new Cloudinary(result);
            cloudinary.save(function(err, doc) {
                if (err) cb(err, false);
                else cb(doc, true);
            });

        });
    },
    delete: function(id, cb) {
        Cloudinary.findById(id, function(err, data) {
            if (err) cb(err, false);
            else {
                cloudinary.uploader.destroy(data.public_id, function(result) {
                    if (result) {
                        data.remove(function(err) {
                            if (!err) cb("Cloudinary removed sucessfully",true);
                            else cb(err, false);

                        });
                    } else cb("Cloudinary service unable to destroy data from cloud", false);
                });

            }
        });
    }
};
