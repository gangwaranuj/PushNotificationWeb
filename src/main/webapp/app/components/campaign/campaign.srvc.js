(function () {
    angular.module('app').factory('campaignSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        service.getCountriesTimeZones = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listTimezone')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        service.getCountries = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listcountry')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        service.getBrowsers = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listIcmpbrowser')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        service.getExtension = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listextensionversion')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };
        service.getPlatforms = function () {
            var deferred = $q.defer();
            $http.get('rest/campaignapi/listplatform')
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        service.rssfeedUrlIsValid = function (url) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/rssapi/isurlvalid?url=' + url,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.urlIsValid = function (url) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/rssapi/urlValidApi?url=' + url,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getUrlDetail = function (url) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/api/urlContentApi?url=' + url,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        // service.getWelcomeNotificationDetail = function () {
        //     var deferred = $q.defer();
        //     $http({
        //         method: 'GET',
        //         url: 'rest/welcomeapi/autofill',
        //         headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        //     }).then(function (response) {
        //         deferred.resolve(response);
        //     }, function (error) {
        //         deferred.reject(error);
        //     });
        //     return deferred.promise;
        // };
        service.getCustomNotificationDetail = function (type) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/custom/autofillnotification/'+type ,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveWelcomeNotification = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/welcome',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.listWelcomeNotification = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/listwelcome',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.saveCustomNotification = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/custom/modifycustomnotification',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getRSSFeedCampaigns = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/listrssfeed',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getCampaigns = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/campaignlist',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getNotifications = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/campaignlist',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                response.data = { "Message": null, "Result": "Success", "TotalRecordCount": 42, "Options": null, "Record": null, "Records": [{ "campaign_id": 10407, "campaign_name": "sdfsderwsfdssdsdfdf", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "", "campaign_current_date": "2017-04-07 15:03:11", "campaign_end_date": "", "modification_date": "2017-04-07 15:25:51.189", "campaign_status": 2, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10405, "campaign_name": "sdfsdsfdssdsdfdf", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "", "campaign_current_date": "2017-04-07 15:03:11", "campaign_end_date": "", "modification_date": "2017-04-07 15:24:45.428", "campaign_status": 2, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10403, "campaign_name": "sdfsdsfsdfdf", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "", "campaign_current_date": "2017-04-07 15:03:11", "campaign_end_date": "", "modification_date": "2017-04-07 15:22:35.434", "campaign_status": 2, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10399, "campaign_name": "sdfsdf", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "", "campaign_current_date": "2017-04-07 15:01:07", "campaign_end_date": "", "modification_date": "2017-04-07 15:01:08.234", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10398, "campaign_name": "sdf", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "", "campaign_current_date": "2017-04-07 14:49:26", "campaign_end_date": "", "modification_date": "2017-04-07 14:50:47.159", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10397, "campaign_name": "tewstsfdf_test_ex", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-06 16:42:00", "campaign_current_date": "2017-04-06 16:38:10", "campaign_end_date": "2017-04-06 16:55:00", "modification_date": "2017-04-06 16:38:10.426", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10396, "campaign_name": "twetwet", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-06 17:46:00", "campaign_current_date": "2017-04-06 15:55:03", "campaign_end_date": "2017-05-04 15:46:00", "modification_date": "2017-04-06 15:55:03.062", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10395, "campaign_name": "wrerwerwerwrwr_1", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-07 12:58:00", "campaign_current_date": "2017-04-06 15:19:56", "campaign_end_date": "2017-05-18 12:58:00", "modification_date": "2017-04-06 15:19:56.25", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10394, "campaign_name": "testasfsdcsasssxs", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-05 07:38:00", "campaign_current_date": "2017-04-05 11:04:25", "campaign_end_date": "2017-04-05 23:59:00", "modification_date": "2017-04-05 11:04:25.277", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10392, "campaign_name": "testasfsdcsasss", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-05 07:38:00", "campaign_current_date": "2017-04-05 11:04:08", "campaign_end_date": "2017-04-05 23:59:00", "modification_date": "2017-04-05 11:04:08.173", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10391, "campaign_name": "twtewet", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-04 17:26:00", "campaign_current_date": "2017-04-04 17:23:36", "campaign_end_date": "2017-05-02 17:26:00", "modification_date": "2017-04-04 17:23:36.753", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10390, "campaign_name": "sfsdffdfgdfgdfgfd", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-04 12:36:00", "campaign_current_date": "2017-04-04 12:32:09", "campaign_end_date": "2017-05-02 12:36:00", "modification_date": "2017-04-04 12:32:09.116", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "2", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10385, "campaign_name": "sdfsdfs", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-03 13:54:00", "campaign_current_date": "2017-04-03 17:20:16", "campaign_end_date": "2017-05-01 13:54:00", "modification_date": "2017-04-03 17:20:16.387", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10384, "campaign_name": "wwetwetewt", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-03 13:54:00", "campaign_current_date": "2017-04-03 17:19:45", "campaign_end_date": "2017-05-01 13:54:00", "modification_date": "2017-04-03 17:19:45.855", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": false, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }, { "campaign_id": 10383, "campaign_name": "sfds", "source": null, "generic": null, "timezone_id": 1, "timezone": "Asia/Kolkata", "campaign_schedule_date": "2017-04-04 13:49:00", "campaign_current_date": "2017-04-03 17:14:19", "campaign_end_date": "2017-05-02 13:49:00", "modification_date": "2017-04-03 17:14:19.258", "campaign_status": 4, "eligiblecount": 0, "campaign": null, "isSegmented": true, "campaign_modification_date": null, "expirationTime": 0, "requireInteraction": false, "live": 0, "pending": 0, "expired": 0, "draft": 0, "startIndex": 0, "pageSize": 0, "countries": "", "cities": "", "isps": "", "platform": "", "subscribed": "", "sent": 0, "open": 0, "close": 0, "click": 0, "conversionRate": "", "forwardUrl": null, "description": null, "imagePath": null, "title": null, "file": "" }] };
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.launchCampaign = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/launchcampaign',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.sendNotification = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/sendnotification',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.pauseRSSPUSH = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/statusrssfeed',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.deleteCampaign = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/deletecampaign',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.deleteWelcome = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/deletewelcome',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.deleteRSSFeedCampaign = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/deleterssfeed',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.expirecampaign = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/expirecampaign',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.changecampaignStatus = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/changecampaignStatus',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.changeWelcomeStatus = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/changestatus',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/savecampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        service.draftCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/draftcampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.draftWelcome = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/draftwelcome',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.pendingCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/pendingcampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.pendingWelcome = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/pendingwelcome',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.expireWelcome = function (filter) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/expirewelcome',
                data: JSON.stringify(filter),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.saveRSSFeedCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/saverssfeed',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.saveNewTab = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/newtab',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveMpd = function (data) {
            var deferred = $q.defer();
            var fd = new FormData();
            fd.append('htmlContent', data.mpdData.htmlContent);
            fd.append('mpdType', data.mpdData.mpdType);
            fd.append('campaign_id', data.mpdData.campaign_id);
            fd.append('file', data.mpdData.file);
            fd.append('description', data.mpdData.description);
            fd.append('url', data.mpdData.url);
            fd.append('buttonText', data.mpdData.buttonText);
            fd.append('buttonStyle', data.mpdData.buttonStyle);
            fd.append('icon', data.mpdData.icon);
            $http({
                method: 'POST',
                url: 'rest/campaignapi/mpd',
                data: JSON.stringify(data.mpdData),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        service.getCampaignById = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/campaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.getWelcomeById = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/welcomeapi/fetchwelcomebyid',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getRSSFeedById = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/rssfeed',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.checkIfExist = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/checkcampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.checkIfExistWelcome = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/welcomeapi/checkWelcomeName/' + data.welcomeName + '/' + data.welcomeId,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.updateCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/updatecampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.updateDraftCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/updatedraftcampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        service.updatePendingCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/updatependingcampaign',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.updateRSSFeedCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/rssapi/updaterssfeed',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        service.getTotalCampaign = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/campaigncriteria',
                data: 'countryId=' + data.countryId + '&subscribed=' + data.subscribedFrom
                + '&cityId=' + data.cities + '&isps=' + data.ispId + '&devices=' + data.browserId +'&segments='+ data.segments +'&segmentTypes='+ data.segmentTypes,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveNotification = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/notification',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }

            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveWidget = function (data) {
            var deferred = $q.defer();
            data.fileC = data.icon;
            data.fileP = data.image;
            $http({
                method: 'POST',
                url: 'rest/campaignapi/widget',
                data: data
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveVideoAds = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/video',
                data: data
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.saveNewsFeed = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/newsfeed',
                data: data
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.getWebsites = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/campaignapi/listaccesswebsite',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.getCitiesByCountryId = function (countryId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/campaignapi/listCity/' + countryId,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        service.getISPByCountryId = function (countryId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/campaignapi/listisp?countryId=' + countryId,
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        service.getCustomerNotification = function (data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/campaignapi/customernotification',
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