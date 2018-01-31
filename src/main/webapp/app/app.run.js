(function () {
    angular.module('app').run(['$rootScope', '$cookies', 'UserService', '$state', 'authorization', '$uibModalStack', function ($rootScope, $cookies, UserService, $state, authorization, $uibModalStack) {
        /* Reset error when a new view is loaded */
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            $uibModalStack.dismissAll();
        });
        $rootScope.$on('$viewContentLoaded', function () {
            delete $rootScope.error;
        });
        $rootScope.hasRole = function (role) {
            if ($rootScope.user === undefined) {
                return false;
            }
            if ($rootScope.user.roles[role] === undefined) {
                return false;
            }
            return $rootScope.user.roles[role];
        };


        String.prototype.formatstring = function () {
            //usage: 'bla bla {0}'.format('value')
            var theTemplate = this.toString();

            // start with the second argument (i = 1)
            for (var i = 0; i < arguments.length; i++) {
                // "gm" = RegEx options for Global search (more than one instance)
                // and for Multiline search
                var regEx = new RegExp("\\{" + i + "\\}", "gm");
                theTemplate = theTemplate.replace(regEx, arguments[i]);
            }
            return theTemplate;
        };

    }]);
})();