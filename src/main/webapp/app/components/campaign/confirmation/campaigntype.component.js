(function () {
    var app = angular.module('app');
    app.component('confirmation', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/confirmation/confirmation.html',
        controller: function ($scope) {

        },

        controllerAs: 'vm'
    });
})();