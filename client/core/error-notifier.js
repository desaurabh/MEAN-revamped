angular.module('ngErrorNotifier', [])
    .directive('errorNotifier', function($log, messageNotifier) {
        return {
            restrict: 'E',
            template: '<div layout="row" class="md-whiteframe-z1" ng-show="message.data"><div style="padding:10px;"><md-icon>{{message.type}}</md-icon> {{message.data}}</div><div flex></div><md-button class="md-icon-button" ng-click="closeNotifier()"><md-icon>close</md-icon></md-button></div>',
            scope: {
                message: '=?notifier'
            },
            link: function(scope, elem, attr) {
                scope.messageNotifier = messageNotifier;
                if (typeof scope.message === 'undefined')
                    scope.message = scope.messageNotifier.message;
                scope.$watch('messageNotifier.message', function(newMessage, oldMessage) {

                    scope.message.type = newMessage.type;
                    scope.message.data = newMessage.data;
                }, true);
                scope.closeNotifier = function() {
                    messageNotifier.message.data = false;
                    messageNotifier.message.type = '';
                    scope.messageNotifier = messageNotifier;
                    scope.message = messageNotifier.message;
                };
            }

        };
    }).factory('messageNotifier', function($log) {
        return {
            message: {
                data: false,
                type: ''
            },
            show: function(type, data) {
                if (typeof type === 'string' && typeof data === 'string')
                    this.message = {
                        data: data,
                        type: type
                    };
            }
        };
    });
