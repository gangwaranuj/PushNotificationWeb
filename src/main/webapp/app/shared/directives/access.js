(function() {
  'use strict';
 var app = angular.module('app');
  // angular
  //   .module('app')
    app.directive('access', ['authorization', function (authorization) {

     var directive = {
      restrict: 'A',
      link: linkFunc,
    };



     return directive;

    /** @ngInject */
    function linkFunc($scope, $element, $attrs) {
      var makeVisible = function () {
        $element.removeClass('hidden');
      };

      var makeHidden = function () {
        $element.addClass('hidden');
      };

      var determineVisibility = function (resetFirst) {
        var result;

        if (resetFirst) {
          makeVisible();
        }

        result = authorization.authorize(true, roles, $attrs.accessPermissionType);

        if (result === authorization.constants.authorised) {
          makeVisible();
        } else {
          makeHidden();
        }
      };

      var roles = $attrs.access.split(',');

      if (roles.length > 0) {
          determineVisibility(true);
      }
    }
 
  }]);
})();