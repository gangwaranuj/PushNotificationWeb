(function () {
    var app = angular.module('app');
    app.component('analytic', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/analytics/view/analytic-view.html',
        controller: 'analyticViewController',
        controllerAs: 'vm'
    });
})();