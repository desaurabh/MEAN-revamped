var path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    routes = require('../routes'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('../models/User'),
    userRole = require('./roles.config'),
    MongoStore = require('connect-mongo')(session);


module.exports = function(env, mongoose) {
    var app = express();
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(session({
        secret: 'keyboard cat',
        name: 'c_store',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 14 * 24 * 60 * 60 // expiration= 14 days. Default
        })

    }));
    app.use(passport.initialize());
    app.use(passport.session());




    //passport config
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(userRole.middleware());



    app.use(favicon(__dirname + '../../../client/assets/images/favicon.ico'));


    //front end view directory
    app.set('views', path.join(__dirname, '../../client/views'));
    app.use('/assets', express.static(path.join(__dirname, '../../client/assets/')));
    app.use('/deps', express.static(path.join(__dirname, '../../client/deps/')));
    app.use('/core', express.static(path.join(__dirname, '../../client/core/')));
    app.use('/views', express.static(path.join(__dirname, '../../client/views/')));

    app.use('/default', express.static(path.join(__dirname, '../../client/default')));
    app.use('/templates', express.static(path.join(__dirname, '../../client/templates')));








    //view engine
    app.set('view engine', 'jade');

    app.set('env', env.mode);

    app.use('/', routes.auth);

    app.use('/api', routes.v1);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


    return app;


};
