(function () {
    var app = angular.module('app');
    app.component('subscriptionLayouts', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/subscriptionLayouts/subscriptionLayouts.html',
        controller: ['$scope', 'campaignSrvc', '$timeout', '$state', '$cookies', "subscriptionLayoutSrvc", function ($scope, campaignSrvc, $timeout, $state, $cookies,subscriptionLayoutSrvc) {
            var vm = this;
            vm.subscriptionLayout = { 'type': 'native' };
            vm.typeSelection = function (type) {
                if (type === 'box')
                    $state.go('iopush.auth.subscriptionLayoutsBox');
                else if (type === 'overlay')
                    $state.go('iopush.auth.subscriptionLayoutOverlay');
                else if (type === 'icon')
                    $state.go('iopush.auth.subscriptionLayoutIcon');
                else if (type === 'sidebar')
                    $state.go('iopush.auth.subscriptionLayoutSidebar');
                else if (type === 'button')
                    $state.go('iopush.auth.subscriptionLayoutButtonLink');
                else if (type === 'mobile')
                    $state.go('iopush.auth.subscriptionLayoutMobile');
                else if (type === 'native')
                    $state.go('iopush.auth.subscriptionLayoutNative');
                else if (type === 'topline')
                    $state.go('iopush.auth.subscriptionLayoutTopline');
            }
            
            var getCustomNotificationDetail = function () {
                var notificationDetails = subscriptionLayoutSrvc.layoutDetails;


               /* if (notificationDetails) {
                    vm.notificationDetails = notificationDetails;
                    vm.subscriptionLayout.type = vm.notificationDetails.type;
                }
                else {*/

                    campaignSrvc.getCustomNotificationDetail("desktop").then(function (response) {
                        if (response.data.Result == "Success") {
                            if (response.data.Record) {
                                vm.notificationDetails = response.data.Record;
                                vm.subscriptionLayout.type = vm.notificationDetails.type;
                                subscriptionLayoutSrvc.layoutDetails=vm.notificationDetails;
                               // $cookies.put("notificationDetails", JSON.stringify(vm.notificationDetails));
                            }
                            else{
                                 subscriptionLayoutSrvc.layoutDetails=subscriptionLayoutSrvc.defaultLayoutDetails();
                                //$cookies.put("notificationDetails", JSON.stringify());
                            }
                        }
                        else {
                            subscriptionLayoutSrvc.layoutDetails=subscriptionLayoutSrvc.defaultLayoutDetails();
                            return;
                        }
                    }, function (response) {
                    })

                //}

            };
            getCustomNotificationDetail();
        }],

        controllerAs: 'vm'
    });
})();