(function () {
    var app = angular.module('app');
    app.component('rsspushanalytic', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/analytics/rsspush/rsspush.analytic-view.html',
        controller: 'rsspushAnalyticViewController',
        controllerAs: 'vm'
    });
})();