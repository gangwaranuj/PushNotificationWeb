(function () {
    var app = angular.module('app');

    app.component('navbar', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/navbar/navbar.html',
        controller: 'navbarCtrl',
        controllerAs: 'vm'
    });
})();   