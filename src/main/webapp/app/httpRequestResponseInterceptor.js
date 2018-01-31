(function () {
    angular.module('app').factory('httpRequestResponseInterceptor', ['$cookies', '$q', '$location', 'blockUI', function ($cookies, $q, $location, blockUI) {
        return {
            request: function (config) {
                blockUI.start();
                if ($cookies)
                    return config;
            },
            'response': function (response) {
                blockUI.stop();
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response;
            },
            'responseError': function (rejection) {
                blockUI.stop();
                if (rejection.status === 511) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };

    }]);
})();