'use strict';
angular.module('applicationRoutes', [])
    .provider('applicationRoutes', function() {
        this.routes = {
	    //default routes
            login: {
                templateUrl: 'views/login.html',
                when: '/login',
                icon: 'security',
                name: 'Login',
                show: false
            },
            home: {
                controller: '',
                controllerAs: '',
                templateUrl: 'views/home.html',
                icon: 'dashboard',
                name: 'Dashboard',
                when: '/home',
                show: true
            },
            register: {
                templateUrl: '../views/user/register.html',
                when: '/register',
                name: 'New user',
                show: false,
                controller: 'AccountController'
            },
            addCompany: {
                templateUrl: '../views/account/register.html',
                when: '/register/company',
                name: 'New Company',
                show: false,
                controller: 'AccountController'
            },
            setup: {
                name: 'Settings',
                show: true,
                showSubItem: false,
                subItems: []
            },
            logout: {
                icon: 'exit_to_app',
                name: 'Logout',
                show: false,
                when: 'logout'
            }

        };

        this.$get = function() {
            return this.routes;
        };
    });



(function(angular) {
    angular.module("app", ['angular-loading-bar', 'app.services', 'app.controllers', 'app.directives', 'app.models', 'ngMaterial', 'ngRoute', 'ngAnimate', 'ngAria', 'ngMessages', 'ngSanitize', 'ngResource', 'md.data.table', 'ngFileUpload', 'ngImgCrop', 'ngCore', 'app.core.modules','applicationRoutes'])
        .provider('core', function() {
	    this.basicRoutes={};
            this.$get = function() {
                return this.basicRoutes;
            };
        })
        .config(function($mdThemingProvider, $routeProvider, $logProvider, $locationProvider, cfpLoadingBarProvider, authServiceProvider, applicationRoutesProvider) {
	    var coreProvider={};
	    coreProvider.basicRoutes=applicationRoutesProvider.routes;
	    cfpLoadingBarProvider.includeSpinner = false;
            $mdThemingProvider.theme('default');
            authServiceProvider.roles = ["admin", "subordinate", "cordinator"];
            authServiceProvider.url = {
                login: '/login',
                authenticate: '/auth',
                logout: '/logout',
                home: '/home'
            };
            authServiceProvider.globalUrl = [coreProvider.basicRoutes.register.when,
                coreProvider.basicRoutes.addCompany.when
            ];
            for (var i in coreProvider.basicRoutes) {
                var routes = coreProvider.basicRoutes[i].hasOwnProperty("subItems") ? coreProvider.basicRoutes[i].subItems : coreProvider.basicRoutes[i];
                if (routes.length > 0) {
                    for (var r in routes) {
                        $routeProvider.when(routes[r].when, {
                            templateUrl: routes[r].templateUrl,
                            controller: routes[r].controller,
                            controllerAs: routes[r].controllerAs,
                            reloadOnSearch: routes[r].reloadOnSearch
                        });
                    }
                } else {
                    $routeProvider.when(routes.when, {
                        templateUrl: routes.templateUrl,
                        template: routes.template,
                        controller: routes.controller,
                        controllerAs: routes.controllerAs
                    });
                }
            }
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
            $logProvider.debugEnabled(true);
        }).run(function(authService, $rootScope, messageNotifier) {
            $rootScope.$on('authenticating', function(even, next, current) {
                next.then(function(res) {}, function(err) {
                    if (next.$$state.value.config.url === authService.url.login)
                        messageNotifier.show('error', 'Username or password is invalid');
                });
            });
        });



})(angular);

var debugData;
