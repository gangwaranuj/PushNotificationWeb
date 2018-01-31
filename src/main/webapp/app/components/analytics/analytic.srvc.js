(function () {
    angular.module('app').factory('campaignAnalyticSrvc', ['$http', '$q', function ($http, $q) {
        var response={data:{}};
         var response1={data:{}};
        var service = {};


     service.getRSSCampaignsAnalytics = function (filter) {
            var deferred = $q.defer();
           // deferred.resolve(response);  //TODO Remove
            $http({
                method: 'POST',
                // url: 'rest/campaignapi/campaignlist',
                url: 'rest/rssapi/listrssstats',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

         service.getWelcomeAnalytics = function (filter) {
            var deferred = $q.defer();
         //   deferred.resolve(response);  //TODO Remove
            $http({
                method: 'POST',
                // url: 'rest/campaignapi/campaignlist',
                url: 'rest/welcomeapi/listWelcomeStats',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };



        //  response.data = { "Options": null, "Record": null, "Records": [{ "campaign_id": 387, "campaign_name": "cvbvcbvb_admin", "campaign_type_id": 4, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-21 15:32:00", "campaign_end_date": "2017-02-21 23:59:00", "campaign_current_date": "2017-02-21 15:27:30", "modification_date": null, "campaign_status": 3, "eligiblecount": 94, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 385, "campaign_name": "reet_admin", "campaign_type_id": 4, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-20 11:31:00", "campaign_end_date": "2017-02-20 23:59:00", "campaign_current_date": "2017-02-20 11:27:27", "modification_date": null, "campaign_status": 3, "eligiblecount": 94, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 0, "close": 0, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 386, "campaign_name": "tewte_admin", "campaign_type_id": 2, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-20 11:35:00", "campaign_end_date": "2017-02-20 23:59:00", "campaign_current_date": "2017-02-20 11:30:39", "modification_date": null, "campaign_status": 3, "eligiblecount": 94, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 0, "close": 0, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 370, "campaign_name": "kjs_dev_test11312313312gfdgdgfdg_admin", "campaign_type_id": 2, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 15:44:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 15:40:31", "modification_date": null, "campaign_status": 3, "eligiblecount": 4, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 4, "open": 0, "close": 0, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 358, "campaign_name": "kjs_dev_test11312313312fdfsdfsfsfdsfdsfd_admin", "campaign_type_id": 4, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 13:24:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 13:20:33", "modification_date": null, "campaign_status": 3, "eligiblecount": 4, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 3, "open": 2, "close": 2, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 383, "campaign_name": "kjs_dev_test11312313312sddasdsads_admin", "campaign_type_id": 1, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 17:44:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 17:40:20", "modification_date": null, "campaign_status": 3, "eligiblecount": 2, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 2, "close": 2, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 378, "campaign_name": "kjs_dev_test11312313312sdaadsadsadsads_admin", "campaign_type_id": 6, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 17:26:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 17:21:42", "modification_date": null, "campaign_status": 3, "eligiblecount": 2, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 2, "close": 0, "click": 2, "conversionRate": "100%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 367, "campaign_name": "kjs_dev_test11312313312fdfdsfdsfdsfdsfdsfsdfdd_admin", "campaign_type_id": 4, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 15:34:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 15:30:17", "modification_date": null, "campaign_status": 3, "eligiblecount": 7, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 4, "open": 4, "close": 0, "click": 4, "conversionRate": "100%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 382, "campaign_name": "kjs_dev_test11312313312sddad_admin", "campaign_type_id": 1, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 17:42:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 17:38:22", "modification_date": null, "campaign_status": 3, "eligiblecount": 2, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 1, "close": 1, "click": 0, "conversionRate": "0%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }, { "campaign_id": 362, "campaign_name": "kjs_dev_test11312313312assadsadsadassadsad_admin", "campaign_type_id": 3, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_type": "", "campaign_start_date": "2017-02-16 14:01:00", "campaign_end_date": "2017-02-16 23:59:00", "campaign_current_date": "2017-02-16 13:57:23", "modification_date": null, "campaign_status": 3, "eligiblecount": 2, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "installform": "", "notClick": "", "countries": "", "cities": "", "browsers": "", "accesswebsites": "", "accesswebsites_date": "", "extensionversions": "", "products": "", "isps": "", "sent": 2, "open": 2, "close": 0, "click": 2, "conversionRate": "100%", "newTab": null, "newsfeed": null, "notification": null, "mpdBean": null, "widget": null, "video": null }], "TotalRecordCount": 385, "Result": "Success", "Message": null };

        service.getCampaignsAnalytics = function (filter) {
            var deferred = $q.defer();
         //   deferred.resolve(response);  //TODO Remove
            $http({
                method: 'POST',
                // url: 'rest/campaignapi/campaignlist',
                url: 'rest/campaignapi/campaignstatslist',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        // response1.data = {"Options":null,"Record":null,"Records":[{"countryId":1,"countryName":"India","platformStat":[{"platformId":1,"platformName":"Chrome","campaignSent":2,"campaignOpen":0,"campaignClose":0,"campaignClick":0},{"platformId":3,"platformName":"Firefox","campaignSent":0,"campaignOpen":0,"campaignClose":0,"campaignClick":0},{"platformId":2,"platformName":"Opera","campaignSent":0,"campaignOpen":0,"campaignClose":0,"campaignClick":0}],"cityStat":[{"geoid":1,"cityid":106,"cityname":"Delhi","platform":[{"platformId":1,"platformName":"Chrome","campaignSent":2,"campaignOpen":0,"campaignClose":0,"campaignClick":0},{"platformId":3,"platformName":"Firefox","campaignSent":0,"campaignOpen":0,"campaignClose":0,"campaignClick":0},{"platformId":2,"platformName":"Opera","campaignSent":0,"campaignOpen":0,"campaignClose":0,"campaignClick":0}]}]}],"TotalRecordCount":1,"Result":"Success","Message":null}

        service.getCampaignAnalyticById = function (data) {
            var deferred = $q.defer();
           //  deferred.resolve(response1);  //TODO Remove
            $http({
                method: 'POST',
                url: 'rest/campaignapi/campaignstatscountry',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        return service;

    }]);

})();