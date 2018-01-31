(function () {
    angular.module('app').controller('navbarCtrl', ['$timeout', '$cookies', '$rootScope', '$state', 'UserService', '$scope', '$cookieStore','$uibModal', function ($timeout, $cookies, $rootScope, $state, UserService, $scope, $cookieStore,$uibModal) {
        var vm = this;
        vm.imageUpdating = false;



vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/home-support.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                        };

                    }
                    ],
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };

        $scope.$watch(function () {
            return $cookieStore.get('profilePath');
        }, function (newVal, oldVal) {
            if (newVal) {
                vm.imageUpdating = true;
                $timeout(function () {
                    $scope.$apply(function () {
                        vm.imageSrc = newVal;
                    });
                    vm.imageUpdating = false;
                }, 5000);
            } else {
                vm.imageSrc = 'images/women-icon.png';
            }
        })

  
        if ($cookies) {
            var userCookiedData = JSON.parse($cookies.get('userData'));
            if (userCookiedData && userCookiedData.productList) {
                if (userCookiedData.productList.length == 1) {
                    var productId = userCookiedData.productList[0].productId;
                    switch (parseInt(productId)) {
                        case 1: vm.imageSrc = userCookiedData.imagePath; // 'images/product_cb.png';
                            break;
                        case 2: vm.imageSrc = userCookiedData.imagePath; // 'images/product_ab.png';
                            break;
                        case 3: vm.imageSrc = userCookiedData.imagePath; //'images/product_sb.png';
                            break;
                        default: vm.imageSrc = userCookiedData.imagePath; //'images/profile-pic.png';
                            break;
                    }
                } else {
                    vm.imageSrc = userCookiedData.imagePath; // 'images/profile-pic.png';
                }
            }
        }

        vm.logout = function () {
            UserService.logout().then(function (response) {
                //console.log('logout response', response);
                $cookies.remove('userData');
                $cookies.remove('seeAllArticles')
                $cookieStore.remove('profilePath')
                $cookies.remove("articleSearchType");
                //$cookies.remove("articleSearchDate");
                $cookies.remove("articleSearchFromDate");
                $cookies.remove("articleSearchToDate");
                //$cookies.remove('acitveMenu');
                
                $state.go('iopush.unauth.login');
            }, function (error) {
                $state.go('iopush.unauth.login');
                console.log('logout error', error);
               
            });

        }

    }]);
})();