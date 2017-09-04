angular.module("app.services.data", [])
    .factory("dataConveyor", function($http, $log, Upload) {
        return {
            logout: function(callback) {
                $log.debug("signing out");
                $http({
                    method: "POST",
                    url: "/logout"
                }).then(
                    function(response) {
                        callback(true);
                        $log.debug("successfully logout");
                    },
                    function(error) {
                        callback(false);
                        $log.debug("logout failed");
                    });
            },
            post: function(data, callback, url) {
                $log.debug("Requesting through POST " + url);
                $http({
                    method: "POST",
                    url: url,
                    data: data
                }).then(function(response) {
                    callback(response, true);
                }, function(error) {
                    callback(error, false);
                });
            },

            postfile: function(data, callback, url, event) {
                Upload.upload({
                    url: url,
		    method:'POST',
                    data: '',
		    file:data.file
                }).then(function(resp) {
		    callback(resp, true);
                }, function(resp) {
		    callback(resp, false);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                });
            },

            get: function(callback, url) {
                $log.debug("Requesting through GET " + url);
                $http({
                    method: "GET",
                    url: typeof(url) !== 'string' ? '/' : url
                }).then(function(response) {
                    callback(response, true);
                }, function(error) {
                    callback(error, false);
                });
            }

        };


    });
