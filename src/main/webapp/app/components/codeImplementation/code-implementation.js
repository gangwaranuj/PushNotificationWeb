(function () {

    function configBlock($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('iopush.auth.manageSegments', {
                url: '/manageSegment',
                template: '<manage-segment></manage-segment>'
            });

        $stateProvider
            .state('iopush.auth.subscriberSegmentation', {
                url: '/subscriberSegmentation',
                template: '<subscriber-segmentation></subscriber-segmentation>'
            });

             $stateProvider
            .state('iopush.auth.subscriberSegmentationEdit', {
                url: '/subscriberSegmentation/edit/:id',
                template: '<subscriber-segmentation></subscriber-segmentation>'
            });
            $stateProvider
            .state('iopush.auth.manageSegmentsType', {
                url: '/manageSegmentsType',
                template: '<manage-segment-type></manage-segment-type>'
            });
          

    }

    configBlock.$inject = ['$stateProvider', '$urlRouterProvider'];


    angular.module('codeImplementation', []).config(configBlock);



})();