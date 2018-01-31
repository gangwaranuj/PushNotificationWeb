(function () {
    var app = angular.module('app');
    app.component('isp', {
        bindings: {

        },
        templateUrl: 'app/components/dashboard/isp/isp.html',
        controller: ['ispSrvc', '$scope', 'platformDetail', function (ispSrvc, $scope, platformDetail) {
            var vm = this;
            var mapRender = 0;
            vm.shops = [];
            vm.platformDetail = platformDetail;

            ispSrvc.getData().then(function (response) {
                vm.ispItems = response.Records;
                if (vm.ispItems) {
                    vm.ispItems.forEach(function (item) {
                        for (key in vm.platformDetail) {
                            var data = item.browserBean.find(function (item) {
                                return item.platformName.toLowerCase() == key;
                            });
                            if (data) {
                                item[data.platformName.toLowerCase() + "Count"] = data.count;
                            }
                            //console.log(item);
                        }
                    })
                }
            });

        }],
        controllerAs: 'vm'
    });
})();