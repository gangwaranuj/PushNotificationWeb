(function () {
    var app = angular.module('app');
    app.component('subscriberNotification', {
        bindings: {
        },
        templateUrl: 'app/components/dashboard/subscriberNotification/subscriberNotification.html',
        controller: ['subscriberNotificationSrvc', '$scope', '$cookies', '$state', function (subscriberNotificationSrvc, $scope, $cookies, $state) {
            var vm = this;
            vm.planData = {};
            vm.lastNotificationData = {};
            var imagepath = "";
            subscriberNotificationSrvc.getSubscriberOverviewData().then(function (data) {
                if (data.Records && data.Records.length > 0) {
                    vm.planData = data.Records[0];

                }
            });
            $cookies.put("sellAllCampaignStats", 0);
            vm.redirect = function () {
                $cookies.put("sellAllCampaignStats", 7);
                $state.go('iopush.auth.analytic');
            };

            var userCookiedData = {};

            if ($cookies) {
                userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                if (userCookiedData) {
                    //console.log("userCookiedData",userCookiedData);
                    vm.productURL = userCookiedData.websiteUrl;
                    imagepath = userCookiedData.imagePath;
                }
            }
            subscriberNotificationSrvc.lastNotificationData().then(function (data) {
                vm.isShowLastNotificationDate = false;
                if (data.TotalRecordCount > 0) {
                    var record = data.Records[0];
                    vm.lastNotificationData = record;
                    vm.isShowLastNotificationDate = vm.lastNotificationData.date ? vm.lastNotificationData.date : false;
                    vm.lastNotificationData.date = new Date(vm.lastNotificationData.date);
                    vm.lastNotificationData.clicksPercentage = (record.clicked / record.sent) * 100;
                    vm.lastNotificationData.deliveredPercentage = (record.delivered / record.sent) * 100;
                    vm.lastNotificationData.clickRatePercentage = (record.clicked / record.delivered) * 100;
                }

            });

            subscriberNotificationSrvc.previewLastNotificationData().then(function (data) {

                var record = data.Records[0];
                vm.previewLastNotificationData = record;
                var platform = "";
                if (vm.previewLastNotificationData.platform) {
                    platform = vm.previewLastNotificationData.platform.split(",");
                }
               
                if (vm.previewLastNotificationData.image === "" ) {
                    vm.previewLastNotificationData.image = imagepath;
                }
                var n1 = platform.indexOf("1");  //Chrome
                var n2 = platform.indexOf("2");  //FF
                var n3 = platform.indexOf("3"); //Opera
                var n4 = platform.indexOf("5");   //Android
                vm.chrome = true;
                vm.ff = false;
                vm.opera = false;
                vm.android = false;

                if (n1 >= 0) {
                    vm.chrome = true;
                    vm.ff = false;
                    vm.opera = false;
                    vm.android = false;
                }
                else if (n2 >= 0) {
                    vm.chrome = false;
                    vm.ff = true;
                    vm.opera = false;
                    vm.android = false;
                }
                else if (n3 >= 0) {
                    vm.chrome = false;
                    vm.ff = false;
                    vm.opera = true;
                    vm.android = false;
                }
                else if (n4 >= 0) {
                    vm.chrome = false;
                    vm.ff = false;
                    vm.opera = false;
                    vm.android = true;
                }


            });
        }],
        controllerAs: 'vm'
    });
})();



