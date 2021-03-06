angular.module("app.directives.autocompletes", [])
    .directive('userAutocomplete', function() {
        return {
            restrict: 'E',
            scope: {
                onItemClick: '=onItemClick'
            },
            templateUrl: 'templates/autocomplete.user.tmpl.html',
            link: function(scope, elem, attr, $resource) {
                var rest = $resource('api/v1/user/:id', {
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
                scope.selectedItem = {};
                scope.getItems = function(searchText) {
                    var strings = searchText.split(" ");
                    console.log(strings);

                };
            }
        };
    });
