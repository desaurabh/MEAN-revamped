angular.module("app.directives.forms", [])
    .directive("companyForm", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/forms/form.company.html",
            scope: {
                company: '=model',
                submit: '=onSubmit',
                reset: '=onReset',
                disabled: '=disabledInputs',
                show: '=entireForm',
                submitText: '=submitText'
            },
            link: function(scope, element, attrs) {
                scope.cities = [];
                scope.states = Object.keys(cities);
                scope.loadCities = function() {
                    scope.cities = [];
                    scope.cities = cities[scope.company.address.state];
                };
                console.log(scope.submitText);
            }
        };
    })
    .directive("userForm", function(User, $log) {
        return {
            restrict: 'E',
            templateUrl: '../templates/forms/form.user.html',
            scope: {
                user: '=model',
                submit: '=onSubmit',
                disabled: '=disabledInputs',
                show: '=showChild',
                submitText: '=submitText'
            },
            link: function(scope, elem, attr) {
                //define here all the static  data of a form
                scope.roles = [{
                    value: 'admin',
                    abbrev: 'Admin'
                }, {
                    value: 'subordinate',
                    abbrev: 'Subordinate'
                }, {
                    value: 'coordinator',
                    abbrev: 'Co-ordinator'
                }];
                $log.debug(scope.show);
            }
        };
    });
