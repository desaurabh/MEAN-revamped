angular.module("app.controllers.app", [])
    .controller('AppController',
        function($scope, $rootScope, $log, authService, $mdSidenav, $location, mdDialogProvider, applicationRoutes) {
            $scope.title = "App";
            $scope.toggleLeftMenu = function() {
                $mdSidenav('left').toggle().then(function() {
                    $log.debug('Sidenav toggled');
                });
            };
            $scope.navigateTo = function(url) {
                if (url === 'logout') authService.logout();
                else {
                    $log.debug('Navigating to : ' + url);
                    $location.path(url);
                }
            };
            $scope.navigateOrToggle = function(item) {
                if (!item.hasOwnProperty("subItems"))
                    this.navigateTo(item.when);
                else
                    item.showSubItem = item.showSubItem === true ? false : true;
            };

            $scope.authService = authService;
            $scope.navigationList = applicationRoutes;
            $log.debug($scope.navigationList);
            $scope.openDebug = function() {;
                mdDialogProvider({
                    template: "<p> Debug data <br/>" + debugData + "</p>"
                }, 'custom').show();
            };
            // authService.auth(function(state, data) {
            //     if (typeof data !== 'undefined') $scope.loggedInUser = data.data;

            //     $scope.isAuthorized = state;
            //     $log.debug($scope.loggedInUser);
            // }, req);

        });
