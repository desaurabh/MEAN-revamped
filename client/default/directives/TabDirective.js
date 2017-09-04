angular.module("app.directives.tab", [])
    .directive("customTabs", function() {
        return {
            restrict: 'E',
            templateUrl: "../templates/tabs.tmpl.html"
        };
    });
