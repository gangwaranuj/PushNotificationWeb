(function () {

    function configBlock($stateProvider, $urlRouterProvider) {


   $stateProvider
            .state('iopush.auth.subscriptionLayouts', {
                url: '/subscriptionLayouts',
                template: '<subscription-layouts></subscription-layouts>'
            });


              $stateProvider
            .state('iopush.auth.mobileSubscriptionLayouts', {
                url: '/mobileSubscriptionLayouts',
                template: '<mobile-subscriptionlayouts></mobile-subscriptionlayouts>'
            });


        $stateProvider
            .state('iopush.auth.subscriptionLayoutsBox', {
                url: '/subscriptionLayouts/box',
                template: '<subscription-box></subscription-box>'
            });


        $stateProvider
            .state('iopush.auth.subscriptionLayoutOverlay', {
                url: '/subscriptionLayouts/overlay',
                template: '<subscription-overlay></subscription-overlay>'
            });

              $stateProvider
            .state('iopush.auth.subscriptionLayoutMobile', {
                url: '/mobileSubscriptionLayouts/mobile',
                template: '<subscription-mobile></subscription-mobile>'
            });

              $stateProvider
            .state('iopush.auth.subscriptionLayoutNative', {
                url: '/subscriptionLayouts/native',
                template: '<subscription-overlay></subscription-overlay>'
            });

               $stateProvider
            .state('iopush.auth.subscriptionLayoutMobileNative', {
                url: '/mobileSubscriptionLayouts/native',
                template: '<subscription-mobile></subscription-mobile>'
            });


                   $stateProvider
            .state('iopush.auth.subscriptionLayoutTopline', {
                url: '/subscriptionLayouts/topline',
                template: '<subscription-overlay></subscription-overlay>'
            });

            

        $stateProvider
            .state('iopush.auth.subscriptionLayoutIcon', {
                url: '/subscriptionLayouts/icon',
                template: '<subscription-icon></subscription-icon>'
            });

            $stateProvider
            .state('iopush.auth.subscriptionLayoutSidebar', {
                url: '/subscriptionLayouts/sidebar',
                template: '<subscription-sidebar></subscription-sidebar>'
            });

            $stateProvider
            .state('iopush.auth.subscriptionLayoutButtonLink', {
                url: '/subscriptionLayouts/button',
                template: '<subscription-buttonlink></subscription-buttonlink>'
            });
     
    }

    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];


    angular.module('subscriptionLayout', []).config(configBlock);



})();