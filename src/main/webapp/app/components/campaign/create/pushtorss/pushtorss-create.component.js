(function () {
    var app = angular.module('app');
    app.component('pushtorsscreate', {
        // defines a two way binding in and out of the component
        bindings: {
             formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/campaign/create/pushtorss/pushtorss.html',
        controller: 'pushtorssCreateCtrl',
        controllerAs: 'vm'
    });
})();