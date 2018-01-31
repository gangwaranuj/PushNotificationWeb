(function () {
    var app = angular.module('app');
    app.component('planSummary', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/upgrade/plan-summary.html',
        controller: ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', '$cookies', '$rootScope', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', '$state', 'paymentSrvc', function ($scope, $uibModal, WizardHandler, masterSrvc, $location, $cookies, $rootScope, $stateParams, $q, $timeout, $cookieStore, message, $state, paymentSrvc) {

            var vm = this;
            vm.title = "summary";
            vm.subscriberLimit = 0;
            vm.totalCost = 0;
            vm.orderId=$stateParams ? $stateParams.orderId : 0;
            paymentSrvc.paymentSuccess(vm.orderId).then(function (response) {
                if(response && response.data && response.data.Record){
                    vm.subscriberLimit=response.data.Record.subscriberLimit;
                    vm.totalCost=response.data.Record.amount;
                    vm.planName=response.data.Record.planName;
                    return;
                }
                else{
                    $state.go('iopush.auth.dashboard');
                }
            }, function (error) {
                $state.go('iopush.auth.dashboard');
            })
        }],

        controllerAs: 'vm'
    });
})();