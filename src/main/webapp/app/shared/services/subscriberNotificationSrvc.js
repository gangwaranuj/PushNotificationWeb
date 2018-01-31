(function () {
    angular.module('app').factory('subscriberNotificationSrvc', ['$http', '$q', function ($http, $q) {
        var service = {};
        service.getSubscriberOverviewData = function () {
            var deferred = $q.defer();
            $http.get('rest/planapi')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        service.lastNotificationData = function () {
            var deferred = $q.defer();
            $http.get('rest/lastnotificationapi')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        service.previewLastNotificationData = function () {
            var deferred = $q.defer();
            $http.get('rest/previewlastnotificationapi')
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