(function () {
    angular.module('app').factory('viewsSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};

        service.oneDayviewsclick = function (date) {
            var deferred = $q.defer();
            var url = 'rest/totalViewClickHourApi/' + date + '/' + date + '/3';
            $http.get(url)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }

        service.oneWeekviewsclick = function () {
            var deferred = $q.defer();
            $http.get('rest/totalViewClickApi/NA/NA/2')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }

        service.calendarviewsclick = function (startDate, endDate) {
            var deferred = $q.defer();
            $http.get('rest/totalViewClickApi/' + startDate + '/' + endDate + '/3')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
        return service;
    }]);
})();