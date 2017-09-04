angular.module("app.controllers.users", ['applicationRoutes'])
    .config(function(applicationRoutesProvider) {
        applicationRoutesProvider.routes.setup.subItems.push({
            name: 'Users',
            icon: 'people',
            templateUrl: 'templates/panel.tmpl.html',
            when: '/settings/user',
            controller: 'UserController'
        });
    })
    .controller("UserController", function($scope, $log, User, $resource, restAPI, dataConveyor, mdDialogProvider, $mdToast) {
        var user = new restAPI.User();
        $scope.user = new User();
        $scope.selected = [];
        $scope.userList = [];
        $scope.selectedTab = 0;
        $scope.editEnabled = false;
        $scope.disabled = false;

        $scope.toggleEditing = function() {
            if ($scope.disabled) $scope.disabled = false;
            else $scope.disabled = true;
        };

        $scope.query = {
            limit: 5,
            page: 1,
            count: 0,
            order: 'name',
            onPaginate: function(page, limit) {
                page = parseInt(page);
                limit = parseInt(limit);
                var of = limit;
                var from = page * limit - limit;
                user.query({
                    q: 'limit&limit[of]=' + of + '&limit[from]=' + from
                }).$promise.then(function(data) {
                    $scope.userList = data;
                });
            }
        };
        $scope.panelTitle = "Users";

        $scope.tabs = [{
            label: "New User",
            template: "../views/user/new-user.html",
            disabled: false,
            onDeselect: undefined,
            onSelect: function() {
                $scope.user = new User();
                $scope.disabled = false;
                $scope.show = true;
            }
        }, {
            label: "All Users",
            template: "../views/user/user-list.html",
            disabled: false,
            onDeselect: undefined,
            onSelect: function() {
                viewUserList();
            }
        }, {
            label: "View",
            template: "../views/user/view.html",
            disabled: true,
            onDeselect: function() {
                this.disabled = true;
            },
            onSelect: function() {
                $scope.disabled = true;
                $scope.show = false;
            }
        }];

        $scope.delete = function() {
            mdDialogProvider({
                title: 'Confirm delete',
                textContent: 'You are about to delete user'
            }, 'confirm').show(function() {

                for (var i in $scope.selected) {
                    $log.debug("deleting user " + $scope.selected[i]._id);
                    user.delete({
                        id: $scope.selected[i]._id
                    }).$promise.then(function(data) {
                        $scope.userList.splice($scope.userList.indexOf($scope.selected[i]), 1);
                        $scope.selected.splice(i, 1);
                        $scope.query.count--;
                    });
                }
            });

        };

        $scope.editUser = function(index) {
            $scope.tabs[2].disabled = false;
            viewUser($scope.userList[index]._id);
        };

        $scope.updateUser = function() {
            user.update($scope.user, function(data) {
                //success
                $mdToast.show($mdToast.simple().textContent('Successfully updated').position('top right'));
                $scope.toggleEditing();
            }, function(err) {
                alert(err);
            });
        };


        var viewUser = function(id) {
            user.get({
                id: id
            }, function(data) {
                $scope.selectedTab = 2;
                var keys = Object.keys($scope.user);
                $scope.user._id = data._id;
                for (var k in keys) {
                    $scope.user[keys[k]] = data[keys[k]];
                }
                $scope.user.born = new Date(data.born);
            });
        };

        var viewUserList = function() {
            user.count().$promise.then(function(data) {
                $scope.query.count = data.count;
                user.query({
                    q: 'limit&limit[of]=' + $scope.query.of + '&limit[from]=' + $scope.query.from
                }).$promise.then(function(data) {
                    $scope.userList = data;
                });
            });

        };

        $scope.addNewUser = function() {
            dataConveyor.post({
                user: $scope.user
            }, function(data, state) {
                var title = state === false ? 'Error' : 'Success';
                if (state) {
                    $mdToast.show($mdToast.simple().textContent('New user added').position('top right'));
                } else mdDialogProvider({
                    title: title,
                    textContent: data.data.message
                }, 'alert').show();
            }, "/register");
        };





    });
