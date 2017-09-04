var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    login = require('connect-ensure-login'),
    user = require("../conf/roles.config"),
    HTTP_CODES = require('../utils').HTTP_CODES,
    commonUtil = require('../utils').commonUtil,
    validators = require('../utils').validators,
    mongoose = require('mongoose'),
    API = require('../api/'),
    models = require('../models');


//require('../models/location');



router.all('*', function(req, res, next) {
    if (req.isAuthenticated())
        next();
    else HTTP_CODES.NOT_AUTHORIZED.build('application/json', res);

});



router.param('model', function(req, res, next, model) {
    if (validators.stringIsValid(model)) {
        try {
            req.model = mongoose.model(req.params.model.toLocaleLowerCase());
            next();
        } catch (err) {
            HTTP_CODES.BAD_REQUEST.build('application/json', res);
        }
    } else HTTP_CODES.BAD_REQUEST.build('application/json', res);
});





router.get('/v1/:model/:id', function(req, res, next) {
    req.model.findById(mongoose.Types.ObjectId(req.params.id), function(err, data) {
        if (err) res.status(HTTP_CODES.BAD_REQUEST).json(err);
        else res.json(data);
    });
});

router.get('/v1/:model', function(req, res, next) {
    var api = new API(req);
    switch (api.requestFor) {
        case "limit":
            req.model.find().skip(api.limit.from).limit(api.limit.of).exec(function(err, data) {
                res.json(data);
            });
            break;
        case "count":
            req.model.count().exec(function(err, data) {
                res.json({
                    count: data
                });
            });
            break;
        case "query":
            console.log(api.mQuery);
            req.model.find(api.mQuery).exec(function(err, data) {
                if (err) res.json({
                    error: err
                });
                else res.json({
                    data: data
                });
            });
            break;
        default:
            req.model.find().skip(0).limit(50).exec(function(err, data) {
                res.json(data);
            });
            break;
    }

});




router.post('/v1/:model', function(req, res, next) {
    req.model.create(req.body, function(err, data) {
        if (err) res.status(HTTP_CODES.BAD_REQUEST).json(err);
        else res.status(HTTP_CODES.OK).json(data);
    });
});


/*
 * function performs the update operation on a model
 * Will iterate over the supplied model properties & matches the 
 * value with the saved one if found then it updates the doc
 * WIll try update if model has a Date field
 */
router.put('/v1/:model', function(req, res, next) {
    req.model.findById(mongoose.Types.ObjectId(req.body._id), function(err, data) {
        if (err) res.status(HTTP_CODES.BAD_REQUEST).json(err);
        else {
            //document found
            var keys = Object.keys(req.body);
            var modify = false;
            for (var k in keys) {
                if (req.body[keys[k]] !== data[keys[k]]) {
                    data[keys[k]] = req.body[keys[k]];
                    modify = true;
                }
            }
            if (modify) {
                data.save(function(err, data) {
                    if (err) res.status(HTTP_CODES.BAD_REQUEST).json({
                        err: 'document found but unable to save'
                    });
                    else res.status(HTTP_CODES.BAD_REQUEST).json(data);

                });
            } else res.status(HTTP_CODES.BAD_REQUEST).json({
                err: 'document found but not updated'
            });

        }
    });
});

router.delete('/v1/:model/:id', function(req, res, next) {
    req.model.remove({
        _id: req.params.id
    }, function(err, data) {
        if (err) res.status(HTTP_CODES.BAD_REQUEST).json(err);
        else res.status(HTTP_CODES.OK).json(data);
    });
});





module.exports = router;
