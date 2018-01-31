(function () {
    var app = angular.module('app');
    app.component('changepassword', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/profile/changePassword/profile-changePassword.html',
        controller: 'changePasswordCtrl',
        controllerAs: 'vm'
    });
})();