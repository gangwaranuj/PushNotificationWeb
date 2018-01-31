
(function () {
    angular.module('app').factory('codeImplementationSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        service.getSegmentations = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/listSegmentation',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        
        service.deleteSegment = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/deleteSegmentation',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.saveSegmentType = function (newSegmentType) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/saveSegmentType',
                data: JSON.stringify(newSegmentType),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.saveSegmentation = function (newSegment) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/saveSegmentation',
                data: JSON.stringify(newSegment),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.checkSegmentExist = function (newSegment) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/checkSegmentName',
                data: JSON.stringify(newSegment),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getSegmentById=function(segment){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/fetchsegmentbyid',
                data: JSON.stringify(segment),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }



        return service;
    }]);
})();