(function () {
    angular.module('app').factory('platformSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};


        service.oneDayviewsclick = function (date) {
            var deferred = $q.defer();

            //var url = 'rest/api/totalViewClickHourApi/' + date + '/' + date + '/3';
            var url = 'rest/trendshourapi/'+date+'/'+date+'/3';
            $http.get(url)
                .success(function (response) {
                    //alert (response.Result);
                    // response = {
                    //     "Records": [{ "date": "0", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "1", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "2", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "3", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "4", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "5", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "6", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "7", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "8", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "9", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "10", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "11", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "12", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "13", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "14", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "15", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "16", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "17", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "18", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "19", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "20", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "21", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "22", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "23", "android": 154, "chrome": 523, "firefox": 332 }
                    //     ], "TotalRecordCount": 24, "Result": "Success", "Options": null, "Record": null, "Message": null
                    // }
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);

                    deferred.reject(response);
                });

            return deferred.promise;
        }

        // one week viewclicks
        service.oneWeekviewsclick = function () {
            var deferred = $q.defer();

            //$http.get('rest/api/totalViewClickApi/NA/NA/2')
            $http.get('rest/trendsapi/NA/NA/2')
                .success(function (response) {
                    //alert (response.Result);
                    // response = {
                    //     "Records": [{ "date": "2017-01-24", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "2017-01-25", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "2017-01-26", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "2017-01-27", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "2017-01-28", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "2017-01-29", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "2017-01-30", "android": 174, "chrome": 323, "firefox": 132 }
                    //     ], "TotalRecordCount": 7, "Result": "Success", "Options": null, "Record": null, "Message": null
                    // }
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }
        // calendar viewclicks
        service.calendarviewsclick = function (startDate, endDate) {
            var deferred = $q.defer();
            //$http.get('rest/api/totalViewClickApi/' + startDate + '/' + endDate + '/3')
            $http.get('rest/trendsapi/' + startDate + '/' + endDate + '/3')

                .success(function (response) {
                    //alert (response.Result);
                    // response = {
                    //     "Records": [{ "date": "2017-01-24", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "2017-01-25", "android": 174, "chrome": 323, "firefox": 132 },
                    //     { "date": "2017-01-26", "android": 164, "chrome": 423, "firefox": 432 },
                    //     { "date": "2017-01-27", "android": 154, "chrome": 523, "firefox": 332 },
                    //     { "date": "2017-01-28", "android": 194, "chrome": 123, "firefox": 232 },
                    //     { "date": "2017-01-29", "android": 184, "chrome": 223, "firefox": 232 },
                    //     { "date": "2017-01-30", "android": 174, "chrome": 323, "firefox": 132 }
                    //     ], "TotalRecordCount": 7, "Result": "Success", "Options": null, "Record": null, "Message": null
                    // }
                    deferred.resolve(response);
                }).error(function (response) {
                    //  alert(response);
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        service.getTrendData = function () {
            var deferred = $q.defer();
            $http.get('rest/platformapi')
                .success(function (response) {
                    //response = { "Result": "Success", "Records": [{ "platformName": "Opera", "count": 162 },{ "platformName": "Android", "count": 162 }, { "platformName": "Firefox", "count": 612 }, { "platformName": "Chrome", "count": 265 }], "TotalRecordCount": 4 }
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
        return service;
    }]);
})();