angular.module('app.services.auth', [])
    .factory("authService", function($log, dataConveyor, $routeParams, $location, User, Company, messageNotifier) {
        return {
            user: new User(),
            login: function() {
                dataConveyor.post(this.user, function(data, state) {
                    if (state) location.reload();
                    else  messageNotifier.show("warning", "Username or password is wrong");
                }, "/login");
            },
            logout: function() {
                $log.debug("signing out");
                dataConveyor.logout(function(state) {
                    if (state) {
                        $location.path('/');
                        location.reload();
                    } else {
                        $log.debug("Error occured during logout");
                    }
                });
            },
            auth: function(callback, req) {
                $log.debug("verifying authentication");
                dataConveyor.get(function(data, state) {
                    callback(state, data);
		    if(state) routes=data.data.routes;
                    if (typeof req !== 'undefined') $location.path(decodeURIComponent(req));
                }, "/auth");
            },
            create: function(message) {
                $log.debug("creating new user");
                dataConveyor.post(this.user, function(data, state) {
                    if (state) {
                        $log.debug(data);
                        message.toggleMessage('success', "User successfully created");
                    } else {
                        $log.debug(data);
                        message.toggleMessage('error', data.data.message);
                    }
                }, "/register");

            },
            rememberMe: false,
            doRememberMe: function(rememberMe) {
                $log.debug("Remember me " + rememberMe);
            }
        };

    });

var routes;

