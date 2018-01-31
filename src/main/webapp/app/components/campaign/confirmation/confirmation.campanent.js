(function () {
    var app = angular.module('app');
    app.component('confirmation', {
        // defines a two way binding in and out of the component
        bindings: {
               formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/campaign/confirmation/confirmation.html',
        controller:['$scope', function ($scope) {
        	
        }],

        controllerAs: 'vm'
    });
})();