(function () {
    angular.module('app').factory('geoSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        service.geoCountry = function () {
            var deferred = $q.defer();
            $http.get('rest/geoapi')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };
        service.geoDetails = function (geoCode) {
            var geoDeferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/fetchCityApi/' + geoCode,
                headers: { 'Content-Type': 'text/plain;' }
            }).success(function (geoResponse) {
                geoDeferred.resolve(geoResponse);
            }).error(function (geoResponse) {
                geoDeferred.reject(geoResponse);
            });
            return geoDeferred.promise;
        }
        return service;
    }]);
})();