(function () {
    var app = angular.module('app');
    app.component('welcomeanalytic', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/analytics/welcome/welcome.analytic-view.html',
        controller: 'welcomeAnalyticViewController',
        controllerAs: 'vm'
    });
})();