(function () {

    function configBlock($stateProvider, $urlRouterProvider) {


        $stateProvider.state('iopush.auth.upgradeplan', {
            url: '/upgrade',
            template: '<upgrade-plan></upgrade-plan>'
        });


        $stateProvider.state('iopush.auth.plansummary', {
            url: '/plan/summary/?orderId=:',
            template: '<plan-summary></plan-summary>'
        });

        $stateProvider.state('iopush.auth.planerror', {
            url: '/plan/error/?name=:&message=:',
            template: '<plan-error></plan-error>'
        });
    }

    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];
    angular.module('upgradePlan', []).config(configBlock);
})();