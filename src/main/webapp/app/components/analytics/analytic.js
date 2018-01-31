(function () {

    function configBlock($stateProvider, $urlRouterProvider) {

        $stateProvider.state('iopush.auth.analytic', {
            url: '/analytic',
            template: '<analytic></analytic>'

        });


        $stateProvider.state('iopush.auth.rsspushanalytic', {
            url: '/rsspushanalytic',
            template: '<rsspushanalytic></rsspushanalytic>'

        });


        $stateProvider.state('iopush.auth.welcomeanalytic', {
            url: '/welcomeanalytic',
            template: '<welcomeanalytic></welcomeanalytic>'

        });

    }








    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];


    angular.module('analytic', []).config(configBlock);



})();