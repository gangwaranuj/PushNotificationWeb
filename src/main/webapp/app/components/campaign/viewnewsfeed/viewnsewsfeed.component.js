(function () {
    var app = angular.module('app');
    app.component('viewnewsfeed', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/campaign/viewnewsfeed/viewnewsfeed.html',
        controller:['$scope', function ($scope) {

        }],

        controllerAs: 'vm'
    });
})();