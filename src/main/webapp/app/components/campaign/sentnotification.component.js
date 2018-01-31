(function () {
    var app = angular.module('app');
    app.component('sentnotification', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/campaign/sentnotification.html',
        controller: ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', 'campaignSrvc', 'message',function ($scope, $uibModal, WizardHandler, masterSrvc, $location, campaignSrvc,message) {
            var vm = this;
            vm.currentRoute = $location.path();
            vm.isOnDemand = $location.path().indexOf('ondemand') !== -1 ? false : true;
            vm.next = function () {
                //wz-next 
                // if (validate())
                //     WizardHandler.wizard().next();
                // return false;
                var data = {};

                if (validate()) {
                    data.title = vm.headline;
                    data.description = vm.textdescription;
                    data.imagePath = vm.notificationimageurl;
                    data.forwardUrl = vm.url;

                    campaignSrvc.getCustomerNotification(data).then(function (response) {
                        if (response.data.responseCode === 200) {
                            vm.sentNotificationMessage(response.data.responseDescription);
                            vm.headline = "";
                            vm.textdescription = "";
                            vm.notificationimageurl = "";
                            vm.url = "";
                        }
                        else {
                            vm.messageBox(response.data.responseDescription);
                        }

                    });

                }

            };

            vm.sentNotificationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout,message) {

                        modalScope.confirmationMessage = confirmationMessage;
                        // var currentDateTime = new Date(moment.tz(timeZone).format('YYYY-MM-DD HH:mm:ss'));//new Date()
                        // currentDateTime.setMinutes(currentDateTime.getMinutes() + 15);
                        // if (((new Date(campaignstartdate)) > currentDateTime) && (status === 2)) {
                        //     modalScope.confirmationMessage = 'Campaing will be launch on ' + campaignstartdate;
                        // }
                        // else if (((new Date(campaignstartdate)) > currentDateTime) && (status === 4)) {
                        //     modalScope.confirmationMessage = 'Campaing will be launch on ' + campaignstartdate;
                        //     campaignSrvc.changecampaignStatus({ "campaign_id": id });
                        // }
                        // else if ((new Date(campaignenddate)) <= (currentDateTime)) {
                        //     modalScope.confirmationMessage = 'Campaign has been expired successfully!';
                        //     campaignSrvc.expirecampaign({ "campaign_id": id });
                        // }
                        // else {
                        //     modalScope.confirmationMessage = confirmationMessage;
                        //     campaignSrvc.launchCampaign({ "campaign_id": id }).then(function (response) {
                        //         if (response.data.Result === "Success") {
                        //             vm.yes = true;
                        //             vm.loadCampaigns(vm.limit, vm.skip);
                        //         }
                        //         else {
                        //             modalScope.confirmationMessage = "Failed to launch some error occur";
                        //         }
                        //     });
                        // }
                        $timeout(function () {
                            $uibModalInstance.dismiss();
                        }, 5000);
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

            vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/warning.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout,message) {
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

            function validate() {
                var validationPass = true;
                var currentDate = new Date();
                // currentDate.setHours(00);
                //  currentDate.sett
                var expression = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'

                var url = new RegExp(expression, 'i');

                if (!vm.notificationimageurl || vm.notificationimageurl === '') {
                    validationPass = false;
                    vm.messageBox("Please enter image url");
                }

                else if (vm.notificationimageurl !== '') {
                    if (!url.test(vm.notificationimageurl)) {
                        validationPass = false;
                        vm.messageBox("Please enter valid image url");
                    }

                }

                else if ((!vm.headline) || vm.headline === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.headlineRequire);

                }
                else if (vm.headline.length > 48) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.headlineLength);
                }
                else if ((!vm.textdescription) || vm.textdescription === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.DescriptionRequire);

                }
                else if (vm.textdescription.length > 100) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.DescriptionLengh);
                }
                else if ((!vm.url) || vm.url === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.urlRequire);

                }
                else if (vm.url.length > 200) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.urlLenght);
                }
                else if (vm.url !== '') {
                    if (!url.test(vm.url)) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.urlFormat);
                    }

                }


                return validationPass;

            }

            vm.preview = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/components/campaign/viewnewsfeed/viewnewsfeed.html',

                    controller: function ($scope, $uibModalInstance) {

                        $scope.render = true;
                        $scope.title = vm.formdata.notification.headline;
                        $scope.description = vm.formdata.notification.textdescription;
                        $scope.imageSrc = vm.formdata.notification.selectedImage ? vm.formdata.notification.selectedImage : "images/img-thumb.png";
                        $scope.url = vm.formdata.notification.url
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },



                    controllerAs: 'vm'
                });
            };

        }],

        controllerAs: 'vm'
    });
})();