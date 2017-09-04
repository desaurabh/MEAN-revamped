'use strict';
var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController'),
    CompanyController = require('../controllers/CompanyController'),
    passport = require('passport'),
    login = require('connect-ensure-login'),
    user = require("../conf/roles.config"),
    HTTP_CODES = require('../utils').HTTP_CODES,
    common = require('../utils').common,
    multiparty = require('connect-multiparty'),
    routerFile = require('../../client/default/services/RouteProvider'),
    MailFactory = require('../utils/Mandrill');


router.get('/:route/:path', function(req, res, next) {
    if (!req.isAuthenticated()) res.redirect('/login');
    else next();
});

router.get('/mail/:path', function(req, res, next) {
    //    res.render("../mail-templates/registration",{user:req.user});
    if (typeof req.params.path !== 'undefined') {
        var mFactory = new MailFactory("registration", [{
            fName: req.user.fName,
            lName: req.user.lName,
            email: req.user.email,
            _id: req.user._id
        }]);
        mFactory.sendMail(function(result, err) {
            if (!result) HTTP_CODES.BAD_REQUEST.build('application/json', res);
            else res.send(result);
        });
    } else
        HTTP_CODES.BAD_REQUEST.build('application/json', res);
});




router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) res.redirect('/login');
    else res.redirect('/home');
});

router.get('/home', function(req, res, next) {
    if (!req.isAuthenticated()) res.redirect('/login');
    else {
        res.render('default.jade', {
            title: "Welcome to default app"
        });
    }
});


router.get('/register', function(req, res, next) {
    res.render('default.jade', {
        title: "New registration"
    });
});


router.get('/account', function(req, res, next) {
    res.render('default.jade', {
        title: "My Account"
    });
});

router.get('/login', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('default.jade', {
            title: "Login"
        });
    } else res.redirect('/');
});


router.get("/myaccount", function(req, res, next) {
    if (typeof req.user !== 'undefined') {
        res.status(HTTP_CODES.OK.code).json(req.user);
    } else {
        HTTP_CODES.CODES.BAD_REQUEST.build('application/json', res);
    }
});



router.get('/settings/*', function(req, res, next) {
    res.render('default.jade', {
        title: "Settings"
    });
});



router.get('/auth', function(req, res, next) {
    if (!req.isAuthenticated())
        HTTP_CODES.NOT_AUTHORIZED.build('application/json', res);
    else {

        res.status(HTTP_CODES.ACCEPTED.code).json({
            username: req.user.username,
            avatar: req.user.avatar,
            name: req.user.fName + " " + req.user.lName,
            type: req.user.role
        });
    }
});



router.post('/register', function(req, res, next) {
    var uc = new UserController(req, res);
    uc.save(function(data, state) {
        if (state) HTTP_CODES.OK.build('application/json', res);
        else {
            res.status(HTTP_CODES.BAD_REQUEST.code).json(data);
        }
    });
});


router.post('/login', passport.authenticate('local'), function(req, res, next) {
    common.addNewToken(16, function(token) {
        req.session.api_store = token;
        res.cookie('api_store', token, {
            path: '/',
            maxAge: 14 * 24 * 60 * 60,
            httpOnly: true
        });
        res.redirect('/auth');
    });
});



router.post('/logout', function(req, res, next) {
    req.session.destroy();
    req.logout();
    res.clearCookie('api_store', {
        path: '/'
    });
    HTTP_CODES.OK.build('application/json', res);
});

router.post("/registercompany", function(req, res, next) {

    var cc = new CompanyController(req, res);
    cc.save(function(data, state) {
        if (state) {
            HTTP_CODES.OK.build('application/json', res);
        } else {
            res.status(HTTP_CODES.BAD_REQUEST.code).json(data);
        }
    });
});




router.get("/validate/", function(req, res, next) {
    var who = req.query.hasOwnProperty("type") && req.query.hasOwnProperty("code") ? req.query.type : false;
    var response = function(data, state) {
        if (!state) HTTP_CODES.BAD_REQUEST.build('application/json', res);
        else res.render('default.jade', {
            title: "Successfully validated"
        });
    };
   
    switch (who) {
        case "user":
            var uc = new UserController(req, res);
            uc.validate(req.query.code, response);
            break;
        case "company":
            var cc = new CompanyController(req, res);
            cc.validate(req.query.code, response);
            break;
        default:
            response(undefined, false);
            break;
    }

});


router.post("/changeProfilePic", multiparty(), function(req, res, next) {
    var uc = new UserController(req, res);
    uc.addProfilePic(function(data, state) {
        if (!state) HTTP_CODES.INTERNAL_SERVER_ERROR.build('application/json', res);
        else res.status(HTTP_CODES.OK.code).json(req.user.avatar);
    });
});



module.exports = router;
