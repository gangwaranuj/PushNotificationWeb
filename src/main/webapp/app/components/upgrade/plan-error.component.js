(function () {
    var app = angular.module('app');
    app.component('planError', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/upgrade/plan-error.html',
        controller: ['$scope', '$uibModal',  '$location', '$cookies', '$rootScope',  '$stateParams', '$q', '$timeout', '$cookieStore', 'message',  '$state',  function ($scope, $uibModal,  $location, $cookies, $rootScope, $stateParams, $q, $timeout, $cookieStore, message, $state) {

            var vm = this;
            vm.title="error";
            vm.name=$stateParams.name;
            vm.message=$stateParams.message;
        }],

        controllerAs: 'vm'
    });
})();