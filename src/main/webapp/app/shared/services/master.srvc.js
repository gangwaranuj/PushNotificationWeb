(function () {
    angular.module('app').factory('masterSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        // Local/Staging Base URL
        // var baseUrl="http://10.101.22.113:8080/icmp/";

        // Production Base URL 
        //  var baseUrl="https://www.iosisbackoffice.com/";

        service.getProducts = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listproduct'
            )
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.getInternetProviders = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listisp'
            )
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.getTimezones = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listtimezone'
            )
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.getSegmentTypes = function () {
            var deferred = $q.defer();
            $http.get('rest/segment/listSegmentType'
            )
                .success(function (response) {
                    //alert (response.Result);
                    if (response.Records) {
                        response.Records = response.Records.filter(function (item) {
                            return item.DisplayText && item.DisplayText.trim();
                        })
                    }
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.getSegments = function (segmentTypeIds) {
            var deferred = $q.defer();
            $http.get('rest/segment/listSegment/' + segmentTypeIds
            )
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.validateUrl = function (url) {
            var deferred = $q.defer();
            $http.get('rest/api/urlValidApi?url=' + url)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };
        service.saveSiteApi = function (url) {
            var deferred = $q.defer();
            $http.get('rest/api/saveSiteApi?url=' + url)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.passwordRegex = function () {
            return {
                san: '^(?=.*[_@./#&+-])(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_@./#&+-]+){8,20}$',  //alphanumeric + special chars
                an: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,20}$', //alphanumeric
                sn: '^(?=.*[_@./#&+-])(?=.*[0-9])([0-9_@./#&+-]+){8,20}$', //numbers + special chars
                sa: '^(?=.*[_@./#&+-])(?=.*[a-zA-Z])([a-zA-Z_@./#&+-]+){8,20}$' //alphbests + special chars

            }
        }

        service.getTotalMatchingUsers = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/segment/subscribercount',
                data: 'segmentId=' + filter.segmentId,//JSON.stringify(filter),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                // headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.getCountryInfo = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://restcountries.eu/rest/v2/all',

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                // headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.saveUserQueryRequest = function (query) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/externalapi/getintouch',
                data: query,
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