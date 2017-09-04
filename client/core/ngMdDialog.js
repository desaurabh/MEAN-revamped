//Purpose of this package is to provide full control over Material design dialogs by writing as minimum code as possible
/* Name : Material design dialogs
 * Author: sourabh verma
 */

(function(angular, undefined) {
  "use strict";
  angular.module("ngMdDialog", ['ngMaterial'])
    .factory("mdDialogProvider", function($mdDialog, $mdMedia) {
      function buildDialogProperties(object) {
        return {
          parent: typeof object.parent === 'undefined' ? document.getElementsByName('body') : object.parent,
          clickOutsideToClose: typeof object.clickOutsideToClose === 'undefined' ? true : object.clickOutsideToClose,
          title: object.title,
          textContent: object.textContent,
          targetEvent: object.targetEvent,
          controller: object.controller,
          templateUrl: object.templateUrl,
          template: object.template,
          controllerAs: object.controllerAs,
          autoWrap: object.autoWrap,
          openFrom: object.openFrom,
          closeTo: object.closeTo,
          scope: object.scope,
          preserveScope: object.preserveScope,
          disableParentScroll: object.disableParentScroll,
          hasBackdrop: object.hasBackdrop,
          escapeToClose: object.escapeToClose,
          locals: object.locals,
          bindToController: object.bindToController,
          resolve: object.resolve,
          onShowing: object.onShowing,
          onComplete: object.onComplete,
          onRemoving: object.onRemoving,
          fullscreen: object.fullscreen
        }
      }

      function Builder(object, type) {
        this.dialogType;
        this.dialog;
        object = typeof object === 'undefined' ? object = {
          title: undefined
        } : object;
        object.title = typeof object.title === 'undefined' ? type.replace(type[0], type[0].toUpperCase()) : object.title;
        switch (type) {
          case "alert":
            object.textContent = typeof object.textContent === 'undefined' ? 'Something went wrong' : object.textContent;
            this.dialogType = buildDialogProperties(object);
            this.dialog = $mdDialog.alert()
              .parent(this.dialogType.parent)
              .clickOutsideToClose(this.dialogType.clickOutsideToClose)
              .title(this.dialogType.title)
              .textContent(this.dialogType.textContent)
              .ariaLabel('alert dialog')
              .ok('ok') //Alert box button is ok
              .targetEvent(this.dialogType.targetEvent);
            break;
          case "confirm":
            object.textContent = typeof object.textContent === 'undefined' ? 'Please confirm before proceed.' : object.textContent;
            this.dialogType = buildDialogProperties(object);
            this.dialog = $mdDialog.confirm()
              .parent(this.dialogType.parent)
              .clickOutsideToClose(this.dialogType.clickOutsideToClose)
              .title(this.dialogType.title)
              .textContent(this.dialogType.textContent)
              .ariaLabel('alert dialog')
              .ok('ok') //Confirm box button is ok
              .cancel('cancel')
              .targetEvent(this.dialogType.targetEvent);
            break;
          case "custom":
            object.body = typeof object.body === 'undefined' ? '[no custom body or template defined]' : object.body;
            this.dialogType = buildDialogProperties(object);
            for (var i in this.dialogType)
              typeof this.dialogType[i] === 'undefined' ?
              delete this.dialogType[i] : false;
            this.dialog = this.dialogType;
            break;
        }

      }

      return function(object, type) {
        var builder;
        if (typeof object === 'string' && typeof type === 'undefined') builder = new Builder(undefined, object);
        else if (typeof object === 'object' && typeof type === 'string') builder = new Builder(object, type);
        else if (typeof object === 'undefined' && typeof type === 'undefined') console.log("Dialog type is not defined");
        return {
          show: function(ok, cancel) {

            $mdDialog.show(builder.dialog).then(function() {
              //ok
              typeof ok === 'function' ? ok() : false;
            }, function() {
              //cancel
              typeof cancel === 'function' ? cancel() : false;
            })
          }
        }
      }

    });
})(angular);
