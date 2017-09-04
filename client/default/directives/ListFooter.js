angular.module('app.directives.listFooter', [])
    .directive('listFooter', function() {

        return {

            restrict: 'E',
            templateUrl: '../templates/list-footer.tmpl.html',
            scope: {
                data: '=data',
                rest: '=rest',
		tooltip:'=tooltip'
            },
            link: function($scope, elem, attr) {
		console.log("dsadsadsadsa");
                $scope.paginate = {
                    from: 0,
                    of: 5,
                    total: 0,
                    next: false,
                    prev: false,
                    first: false,
                    last: false

                };
                $scope.decorateData = function() {
                    $scope.rest.count(function(data) {
                        $scope.paginate.total = data.count;
                        $scope.rest.query({
                            q: 'limit&limit[of]=' + $scope.paginate.of + '&limit[from]=' + $scope.paginate.from
                        }, function(data) {
                            $scope.data = data;
                            if ($scope.paginate.from + $scope.paginate.of >= $scope.paginate.total)
                                $scope.next = false;
                            else $scope.next = true;
                            if ($scope.paginate.from < $scope.paginate.of)
                                $scope.prev = false;
                            else $scope.prev = true;

                        });
                    });
                };

                $scope.decorateData();
                $scope.controls = {
                    prev: function() {
                        if ($scope.prev) {
                            $scope.paginate.from -= $scope.paginate.of;
                            $scope.decorateData();
                        }

                    },
                    next: function() {
                        if ($scope.next) {
                            $scope.paginate.from += $scope.paginate.of;
                            $scope.decorateData();
                        }


                    },
                    first: function() {
                        $scope.paginate.from = 0;
                        $scope.decorateData();
                    },
                    last: function() {
                        $scope.paginate.from = Math.floor($scope.paginate.total / $scope.paginate.of) * $scope.paginate.of;
                        $scope.decorateData();
                    }
                };
            }
        };


    });
