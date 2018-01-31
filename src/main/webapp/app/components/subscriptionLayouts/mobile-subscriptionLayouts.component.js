(function () {
    var app = angular.module('app');
    app.component('mobileSubscriptionlayouts', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/subscriptionLayouts/mobile-subscriptionLayouts.html',
        controller: ['$scope', 'campaignSrvc', '$timeout', '$state', '$cookies', "subscriptionLayoutSrvc", function ($scope, campaignSrvc, $timeout, $state, $cookies,subscriptionLayoutSrvc) {
            var vm = this;
            vm.subscriptionLayout = { 'type': 'native' };
            vm.typeSelection = function (type) {
     
                 if (type === 'mobile')
                    $state.go('iopush.auth.subscriptionLayoutMobile');
                else if (type === 'native')
                    $state.go('iopush.auth.subscriptionLayoutMobileNative');
         
            };
            
            var getCustomNotificationDetail = function () {
                var notificationDetails = subscriptionLayoutSrvc.MobilelayoutDetails;

               /* if (notificationDetails) {
                    vm.notificationDetails = notificationDetails;
                    vm.subscriptionLayout.type = vm.notificationDetails.type;
                }
                else {*/
                    campaignSrvc.getCustomNotificationDetail("mobile").then(function (response) {
                        if (response.data.Result == "Success") {
                            if (response.data.Record) {
                                vm.notificationDetails = response.data.Record;
                                vm.subscriptionLayout.type = vm.notificationDetails.type;
                                subscriptionLayoutSrvc.MobilelayoutDetails=vm.notificationDetails;
                               // $cookies.put("notificationDetails", JSON.stringify(vm.notificationDetails));
                            }
                            else{
                                 subscriptionLayoutSrvc.MobilelayoutDetails=subscriptionLayoutSrvc.defaultLayoutDetails();
                                //$cookies.put("notificationDetails", JSON.stringify());
                            }
                        }
                        else {
                            subscriptionLayoutSrvc.MobilelayoutDetails=subscriptionLayoutSrvc.defaultLayoutDetails();
                            return;
                        }
                    }, function (response) {
                    })

               // }

            };
            getCustomNotificationDetail();
        }],

        controllerAs: 'vm'
    });
})();