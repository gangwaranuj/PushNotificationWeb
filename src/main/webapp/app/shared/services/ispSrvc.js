(function () {
    angular.module('app').factory('ispSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        service.getData = function () {
            var deferred = $q.defer();
            $http.get('rest/ispapi')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        return service;
    }]);
})();