(function(angular) {
    function Location() {
        this.name = "";
        this.address = {
            state: '',
            street: '',
            locality: '',
            city: '',
            country: '',
            pincode: ''
        };
        this.email = "";
        this.phoneOne = "";
        this.phoneTwo = "";
    }


    function addGroupController($scope, controlProvider, $routeParams) {
        $scope.location = {};
	var rest = controlProvider.rest;
        rest.get({
            id: $routeParams.location
        }, function(data) {
	    $scope.location=data;
        });

        $scope.assignedUsers = [];


    }

    function locationController($scope, controlProvider, mdDialogProvider, $location) {
        $scope.rest = controlProvider.rest;
        $scope.locations = [];
        $scope.add = function() {
            mdDialogProvider({
                templateUrl: 'templates/forms/form.location.html',
                controller: DialogController
            }, 'custom').show();
        };

        $scope.location = {};
        $scope.edit = function(location) {
            $scope.location = location;
            mdDialogProvider({
                templateUrl: 'templates/forms/form.location.html',
                controller: function($scope, controlProvider) {
                    $scope.mode = 'edit';
                    $scope.location = location;
                    $scope.disabled = true;
                    $scope.toggle = function() {
                        if ($scope.disabled)
                            $scope.disabled = false;
                        else $scope.disabled = true;
                    };
                    $scope.save = function() {
                        $scope.rest({
                            id: $scope.location._id
                        }, function(data) {
                            data = $scope.location._id;
                            data.save(function(data) {
                                console.log(data);
                                console.log("doc successfully updated");
                            });
                        });
                    };
                    $scope.cancel = controlProvider.cancel;

                }
            }, 'custom').show();
        };


    }

    function DialogController($scope, controlProvider) {
        $scope.save = controlProvider.save;
        $scope.cancel = controlProvider.cancel;
    }





    angular.module('app.core.locations', ['applicationRoutes'])
        .config(function(applicationRoutesProvider) {
            applicationRoutesProvider.routes.setup.subItems.push({
                templateUrl: 'views/core/location.html',
                icon: 'location_city',
                when: '/settings/location',
                name: 'Locations',
                controller: 'LocationController'
            }, {
                templateUrl: 'views/core/add-group.html',
                when: '/settings/location/add-group/:location',
                controller: 'GroupController',
                hide: true
            });
        })
        .controller('LocationController', locationController)
        .controller('GroupController', addGroupController)
        .service('controlProvider', function($resource, $mdDialog) {
            var rest = $resource('api/v1/location/:id', {
                id: '@id'
            }, {
                count: {
                    method: 'GET',
                    params: {
                        q: 'count'
                    },
                    isArray: false
                }
            }, {
                update: {
                    method: 'PUT'
                }
            });
            return {
                location: false,
                rest: rest,

                save: function(domain, cb) {
                    rest.save(domain, function(data) {

                    });
                },
                cancel: $mdDialog.cancel
            };
        });


})(angular);
