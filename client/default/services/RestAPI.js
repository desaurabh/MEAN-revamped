angular.module("app.services.rest", [])
    .factory("restAPI", function($resource) {
        return {
            User: function() {
                var User = $resource('api/v1/user/:id', {
                    id: '@id'
                }, {
                    count: {
                        method: 'GET',
                        params: {
                            q: 'count'
                        },
                        isArray: false
                    },
                    update: {
                        method: 'PUT'
                    }

                });
                return User;
            },
            Company: function() {
                var Company = $resource('api/v1/company/:id', {
                    id: '@id'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
                return Company;
            }
        };
    });
