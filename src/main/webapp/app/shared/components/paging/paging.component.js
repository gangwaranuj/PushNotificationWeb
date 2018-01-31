(function () {
    var app = angular.module('app');
    app.component('paging', {
        // defines a two way binding in and out of the component
        bindings: {
            handler: "=",
            onaction: "="
        },
        // Load the template
        templateUrl: 'app/shared/components/paging/paging.html',
        controller: function ($scope) {
            var vm=this;
            vm.skip = 0;

            vm.pageChanged=function() {
                vm.skip = (vm.handler.currentPage - 1) * vm.handler.limit;
                vm.onaction(vm.handler.currentPage, vm.handler.limit, vm.skip);
            };


        },

        controllerAs: 'vm'
    });
})();