(function () {
    var app = angular.module('app');
    app.component('profileedit', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/profile/edit/profile-edit.html',
        controller: 'editProfileCtrl',
        controllerAs: 'vm'
    });
})();