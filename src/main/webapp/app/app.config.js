(function () {
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpRequestResponseInterceptor');
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('iopush', {
                abstract: true,
                url: ''
            });
        $stateProvider
            .state('iopush.auth', {
                abstract: true,
                url: '',
                views: {
                    'content@': {
                        template: '<ui-view></ui-view>'
                    },
                    'sidebar@': {
                        template: '<sidebar></sidebar>'
                    },
                    'navbar@': {
                        template: '<navbar></navbar>'
                    },
                }
            });
        $stateProvider
            .state('iopush.unauth', {
                abstract: true,
                url: '',
                views: {
                    'content@': {
                        template: '<ui-view></ui-view>'
                    }
                }
            });
        $stateProvider
            .state('iopush.unauth.login', {
                url: '/login',
                template: '<login></login>'
            });

        $stateProvider
            .state('iopush.auth.dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            });

        $stateProvider
            .state('iopush.auth.codeImplementation', {
                url: '/codeImplementation',
                template: '<code-implementation></code-implementation>'
            });
        $stateProvider
            .state('iopush.auth.welcomeNotification', {
                url: '/welcomeNotification',
                template: '<welcome-notification></welcome-notification>'
            });
        $stateProvider
        .state('iopush.auth.manageWelcomeNotification', {
            url: '/manageWelcomeNotification',
            template: '<manage-welcome-notification></manage-welcome-notification>'
        });
        $stateProvider
        .state('iopush.auth.editWelcomeNotification', {
            url: '/welcomeNotification/edit/:id',
            template: '<welcome-notification></welcome-notification>'
        });
        $stateProvider
        .state('iopush.auth.viewWelcomeNotification', {
            url: '/welcomeNotification/view/:id',
            template: '<view-welcome-notification></view-welcome-notification>'
        });
       
    }]);
})();