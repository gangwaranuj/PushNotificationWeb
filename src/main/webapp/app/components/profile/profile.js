(function () {

    function configBlock($stateProvider, $urlRouterProvider) {

        $stateProvider
           
            .state('iopush.auth.profile', {
                url: '/profile/edit',
                template: '<profile></profile>'

            });


    }

    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];


    angular.module('profile', []).config(configBlock);



})();