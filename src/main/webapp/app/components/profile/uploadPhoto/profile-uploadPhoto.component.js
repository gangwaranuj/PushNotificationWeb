(function () {
    var app = angular.module('app');
    app.component('uploadphoto', {
        // defines a two way binding in and out of the component
        bindings: {

        },
        // Load the template
        templateUrl: 'app/components/profile/uploadPhoto/profile-uploadPhoto.html',
        controller: 'uploadPhotoCtrl',
        controllerAs: 'vm'
    });
})();