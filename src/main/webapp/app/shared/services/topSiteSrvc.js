(function () {
    angular.module('app').factory('topSiteSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};

        // one day top 20
        service.oneDayTop20 = function () {
            var deferred = $q.defer();

            $http.get('rest/api/top20TopSiteApi/NA/NA/1')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // one week top 20
        service.oneWeekTop20 = function () {
            var deferred = $q.defer();

            $http.get('rest/api/top20TopSiteApi/NA/NA/2')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // one day custom 
        service.oneDayCustom = function () {
            var deferred = $q.defer();

            $http.get('rest/api/customTopSiteApi/NA/NA/1')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // one week custom
        service.oneWeekCustom = function () {
            var deferred = $q.defer();

            $http.get('rest/api/customTopSiteApi/NA/NA/2')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }


        // calendar custom
        service.calendarCustom = function (startDate, endDate) {
            var deferred = $q.defer();


            $http.get('rest/api/customTopSiteApi/'+startDate+'/'+endDate+'/3')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // calender top 20 
        service.calendarTop = function (startDate, endDate) {
            var deferred = $q.defer();
            $http.get('rest/api/top20TopSiteApi/'+startDate+'/'+endDate+'/3')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }


        service.top20TopSite = function () {
            var deferred = $q.defer();

            $http.get('rest/api/top20TopSiteApi/NA/NA/1')
                .success(function (response) {
                    //alert (response.Result);
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }
        
//        //Get Websites Favicons API
//        service.getSiteFavicons = function (webUrl) {
//            var deferred = $q.defer();
//
//            $http({
//            	method: 'GET',
//            	url: 'http://icons.better-idea.org/allicons.json?pretty=true&url=' + webUrl,
//            	dataType: 'jsonp'
//            }).success(function (response) {
//                    //alert (response.Result);
//                    deferred.resolve(response);
//                }).error(function (response) {
//                    //  alert(response);
//                    deferred.reject(response);
//                });
//
//            return deferred.promise;
//        }

        return service;

    }]);
})();