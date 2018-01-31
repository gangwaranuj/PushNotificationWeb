(function () {
    var app = angular.module('app');
    app.component('subscriptionSidebar', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/subscriptionLayouts/create/sidebar.html',
        controller: ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', '$cookies', '$rootScope', 'campaignSrvc', 'utilitySrvc', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', 'emoji', 'subscriptionLayoutSrvc','$state', function ($scope, $uibModal, WizardHandler, masterSrvc, $location, $cookies, $rootScope, campaignSrvc, utilitySrvc, $stateParams, $q, $timeout, $cookieStore, message, emoji, subscriptionLayoutSrvc,$state) {
            var vm = this;
            //Valialbe declaration
            vm.start = "start";
            vm.end = "end";
            var cityDetail;
            vm.type = "All";
            vm.uploadedimage = [];
            vm.imgClass = "active";
            vm.updImgClass = "inActive";
            vm.isSelectImage = true;
            vm.isuploadImage = false;
            vm.clsOnNotification = "btn btn-primary active";
            vm.clsOffNotification = "btn btn-primary";
            vm.selectedImage = "images/preview-icon.png";

            vm.notificationOffFlag = true;
            vm.notificationOn = {};
            vm.notificationOff = {};



            vm.type = $location.path().split('/');
            vm.customNotificationDetails = {};
            var storedNotificationDetails = subscriptionLayoutSrvc.layoutDetails;
            if (storedNotificationDetails) {
                
                var layoutParams =storedNotificationDetails;
                if (layoutParams.type == vm.type[2]) {
                    vm.customNotificationDetails = layoutParams;
                }
                else {
                    vm.customNotificationDetails = subscriptionLayoutSrvc.defaultLayoutDetails();
                    vm.customNotificationDetails.customNotificationId=layoutParams.customNotificationId;
                }
            }
            else {
                $state.go('iopush.auth.subscriptionLayouts');
            }


            vm.customNotificationDetails.type = vm.type[2];



            vm.previewBoxOpen = { "android": [true, "io-subprv-up"], "firefox": [true, "io-subprv-up"], "chrome": [true, "io-subprv-up"], "opera": [true, "io-subprv-up"] };
            //vm.ioSubprvUpDown = "io-subprv-up";


            //Preview show hide
            vm.showhidePreview = function (platform) {
                if (vm.previewBoxOpen[platform][0]) {
                    vm.previewBoxOpen[platform][0] = false;
                    vm.previewBoxOpen[platform][1] = 'io-subprv-down';
                    return;
                }
                vm.previewBoxOpen[platform][0] = true;
                vm.previewBoxOpen[platform][1] = 'io-subprv-up';
            }

            vm.launchConfirmationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            $state.go('iopush.auth.subscriptionLayouts');
                        };

                    }
                    ],
                    backdrop: 'static',
                    size: 'sm',
                    windowClass: 'messages-sm-modal',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };
            // var getCustomNotificationDetail = function () {
            //     campaignSrvc.getCustomNotificationDetail(vm.customNotificationDetails.type).then(function (response) {
            //         if (response.data.Result == "Success") {
            //             if(response.data.Record){   
            //                 vm.customNotificationDetails = response.data.Record;
            //             }
            //         }
            //         else {
            //             return;
            //         }
            //     }, function (response) {
            //     })
            // };
            // getCustomNotificationDetail();
            vm.getSelectedImage = function (image) {
                // console.log(image.custom);
            };



            vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/warning.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                        };

                    }
                    ],
                    backdrop: 'static',
                    size: 'sm',
                    windowClass: 'messages-sm-modal',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };
            vm.saveCustomNotification = function (customNotificationDetails) {
                //console.log("customNotificationDetails",customNotificationDetails);
                if (customNotificationDetails.title == '') {
                    vm.messageBox(message.subscriptionLayout.customNotificationTitleRequire);
                    return;
                }
                
                

                else if (customNotificationDetails.delayTime > 999) {
                    vm.messageBox(message.subscriptionLayout.delayTimeValidation);
                    return;
                }
                vm.customNotificationDetails.type = vm.type[2];
                vm.customNotificationDetails.logoPath = "";
                  vm.customNotificationDetails.deviceType="desktop";
                campaignSrvc.saveCustomNotification(customNotificationDetails).then(function (response) {
                    if (response.data.responseCode === 200) {
                        subscriptionLayoutSrvc.layoutDetails=undefined;
                        vm.launchConfirmationMessage(response.data.responseDescription);
                    }
                    else {
                        vm.messageBox(response.data.responseDescription);
                        return;
                    }
                }, function (response) {
                });
            };

            $scope.$watch(function () {
                return vm.customNotificationDetails.title;
            },
                function (newval, oldval) {
                    textRendor();
                });

            //        	$('#sidebarInput').on('input', function(e){
            //        		textRendor();
            //        	});

            function textRendor() {
                //debugger;
                if (vm.customNotificationDetails.title) {
                    var sb_txtbx = $('#sbInputedTxt');
                    sb_txtbx.css({ 'opacity': '0', 'line-height': '1', 'position': 'absolute' });
                    var html_org = vm.customNotificationDetails.title;
                    if (html_org === '' || html_org === null || html_org === 'undefined') {
                        $('.prev-sidebar-box').css('height', '40px');
                        $('.prev-sidebar').css('height', '40px');
                    } else {
                        sb_txtbx.html("IOP" + html_org);
                        $('.prev-sidebar-box').css('height', sb_txtbx.width());
                        $('.prev-sidebar').css('width', sb_txtbx.width());
                    }
                }
            }
            //textRendor();
            $(function () {
                $('#cp1').colorpicker();
                $('#cp2').colorpicker();
                $('#cp3').colorpicker();
                $('#cp4').colorpicker();
                $('#cp5').colorpicker();
                $('#cp6').colorpicker();
            });

        }],

        controllerAs: 'vm'
    });
})();