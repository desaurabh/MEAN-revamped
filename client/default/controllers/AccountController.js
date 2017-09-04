angular.module("app.controllers.account", ['applicationRoutes'])
    .config(function(applicationRoutesProvider) {
        applicationRoutesProvider.routes.setup.subItems.push({
            templateUrl: 'templates/panel.tmpl.html',
            icon: 'account_box ',
            when: '/settings/account',
            name: 'Account',
            controller: 'AccountController'
        });
    })
    .controller("AccountController", function($log, $scope, User, dataConveyor, Company, $location, restAPI, mdDialogProvider, avatarService, $mdToast, authService) {
        $log.debug(authService.user.type);
        $scope.panelTitle = "My account";
        $scope.company = new Company();
        $scope.user = new User();
        $scope.disabled = false;
        var company = new restAPI.Company();
        var user = new restAPI.User();
        $scope.editImage = function(image, loggedInUser) {
            if (image !== null)
                avatarService.openAvatarDialog(image, loggedInUser);
        };



        $scope.toggleEditing = function() {
            if ($scope.disabled) $scope.disabled = false;
            else $scope.disabled = true;
        };



        $scope.updateMyProfile = function() {
            user.update($scope.user, function(data) {
                $scope.user = data;
                $mdToast.show($mdToast.simple().textContent('Profile successfully updated').position('top right'));
                $scope.toggleEditing();
            }, function(err) {
                mdDialogProvider({
                    textContent: err
                }, 'alert').show();
            });
        };
        $scope.updateCompany = function() {
            company.update($scope.company, function(data) {
                $scope.company = data;
                $scope.toggleEditing();
                $mdToast.show($mdToast.simple().textContent('Company successfully updated').position('top right'));
            });
        };

        $scope.selectedTab = 0;
        $scope.tabs = [{
            label: "My Profile",
            template: "../views/account/profile.html",
            disabled: false,
            onDeselect: function() {
                $scope.disabled = true;
            },
            onSelect: function() {
                $scope.disabled = true;
                $scope.selectedTab = 0;
                dataConveyor.get(function(data, state) {
                    if (state) {
                        $scope.user = data.data;
                        $scope.user.born = new Date($scope.user.born);
                    } else {

                    }

                }, "/myaccount");
            }
        }, {
            label: "Company",
            template: "../views/account/company.html",
            disabled: false,
            onDeselect: function() {
                $scope.disabled = true;
            },
            onSelect: function() {
                $scope.disabled = true;
                $scope.selectedTab = 1;
                if (typeof $scope.user !== 'undefined') {
                    company.get({
                        id: $scope.user.company
                    }, function(data) {
                        $scope.company = data;
                    });
                }
            }
        }];


        $scope.stepTwo = function() {

            window.document.cookie = "user=" + JSON.stringify($scope.user) + "; expires=" + new Date(Date.now() + 60 * 1000).toGMTString() + "; path=/";
            $location.path("/register/company");
        };

        $scope.createCompany = function() {
            $log.debug($scope.company);
            dataConveyor.post({
                company: $scope.company,
                user: $scope.user
            }, function(res, state) {
                $log.debug(res);
            }, "/registercompany");
        };


        if (window.document.cookie !== "") {
            var name = "user=";
            var get = function() {
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return "";
            };
            if (get() !== "") {
                $scope.user = JSON.parse(get());
            }
        }
    }).factory("avatarService", function(mdDialogProvider) {

        function openAvatarDialog(image, loggedInUser) {

            mdDialogProvider({
                controller: function($scope, $log, $mdDialog, $mdMedia, dataConveyor, Upload, $location) {
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.image = image;
                    $scope.showFooter = false;
                    $scope.template = "../templates/image-upload.tmpl.html";
                    $scope.title = "Change profile picture";
                    $scope.actionName = "Update";
                    $scope.loading = false;

                    $scope.action = function(image, event) {
                        event.currentTarget.disabled = true;
                        $scope.loading = true;
                        dataConveyor.postfile({
                            file: Upload.dataUrltoBlob(image),
                            type: 'avatar'
                        }, function(data, state) {
                            $log.debug(data);
                            $scope.loading = false;
                            $mdDialog.cancel();
                            if (!state) event.currentTarget.disabled = false;
                            else loggedInUser.avatar.url = data.data.url;
                        }, "/changeProfilePic");

                    };
                },
                templateUrl: '../templates/dialog.tmpl.html',
                clickOutsideToClose: false
            }, 'custom').show();


        }
        return {
            openAvatarDialog: openAvatarDialog
        };

    });
