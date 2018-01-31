(function () {

    function configBlock($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('iopush.auth.campaign', {
                url: '/campaign',
                data: {
                    access: {
                        loginRequired: true,
                        requiredPermissions: ['admin']

                    }
                },
                template: '<campaign></campaign>'
            });

        $stateProvider
            .state('iopush.auth.managepushtorss', {
                url: '/managerss',
                template: '<managepushtorss></managepushtorss'
            });



        $stateProvider
            .state('iopush.auth.campaignType', {
                url: '/campaigntype',
                template: '<campaign-type></campaign-type>'
            });


        $stateProvider
            .state('iopush.auth.notificationcampaign', {
                // url: '/sentnotification',
                // template: '<sentnotification></sentnotification>'
                url: '/notification',
                template: '<notification></notification>'

                // url: '/notificationcampaign',
                // template: '<notificationcampaign></notificationcampaign>'
            });

        $stateProvider
            .state('iopush.auth.notificationcampaignEdit', {
                url: '/notification/edit/:id',
                template: '<notification></notification>',
                params: {
                    index: null

                }
            });
        $stateProvider
            .state('iopush.auth.notificationcampaignView', {
                url: '/notificationcampaign/view/:id',
                template: '<notificationcampaign></notificationcampaign>',
                params: {
                    index: null,
                    step: 2
                }
            });

        $stateProvider
            .state('iopush.auth.pushtorssCreate', {
                url: '/rsspush',
                template: '<pushtorsscreate></pushtorsscreate>',
            });

              $stateProvider
            .state('iopush.auth.pushtorssEdit', {
                url: '/rsspush/edit/:id',
              template: '<pushtorsscreate></pushtorsscreate>'
              
            });


    }

    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];


    angular.module('campaign', []).config(configBlock);



})();