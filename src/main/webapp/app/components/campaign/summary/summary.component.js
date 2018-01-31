(function () {
    var app = angular.module('app');
    app.component('summary', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/campaign/summary/summary.html',
        controller: function ($scope, campaignSrvc, $stateParams, WizardHandler, $uibModal, $q, $sce, $cookies) {
            var vm = this;
            vm.launching = false;
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
                    size: 'md',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };

            vm.previous = function () {

                document.body.classList.add('segment-page');
            }
            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            vm.trustAsHtmlSummary = function (string) {
                return $sce.trustAsHtml(string);
            };

            vm.launch = function () {
                vm.launching = true;
                var deferred = $q.defer();
                var promise;
                // vm.formdata.segment.calculateCount = true;
                //    if (!validate()) { vm.launching = false; return; }
                //vm.campaignId = vm.formdata.segment.campaign_id;
                //if (vm.formdata.segment.saved === true) {
                if (vm.formdata.segment.savedOnly === true) {
                    deferred.resolve("Success");
                    promise = deferred.promise;
                }
                else {
                    promise = vm.formdata.segment.saveCampaign(true);  //true indicate ,we are launching campaign
                }

                promise.then(function (result) {

                    if (result === "Failed")
                        return;

                    if ($stateParams.id) {
                        vm.formdata.segment.saved = true;
                        vm.formdata.segment.campaign_id = $stateParams.id;
                    }


                    var currentDateTime = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));// new Date()
                    currentDateTime.setMinutes(currentDateTime.getMinutes() + 15);

                    if ((new Date(vm.formdata.segment.campignStartDate)) > (currentDateTime)) {
                        vm.formdata.confimation.message = 'Campaign saved successfully!';
                        vm.launching = false
                        campaignSrvc.changecampaignStatus({ "campaign_id": vm.formdata.segment.campaign_id });
                        vm.formdata.confimation.description = 'Campaing will be launch on ' + vm.formdata.segment.campignStartDate;
                        WizardHandler.wizard().next();
                    }
                    else if ((new Date(vm.formdata.segment.campignEndDate)) < (currentDateTime)) {

                        vm.formdata.confimation.message = 'Campaign has been expired successfully!';
                        vm.launching = false
                        campaignSrvc.expirecampaign({ "campaign_id": vm.formdata.segment.campaign_id });
                        // vm.formdata.confimation.description = 'Campaing will be launch on ' + vm.formdata.segment.campignStartDate;
                        WizardHandler.wizard().next();
                    }
                    else {
                        vm.formdata.confimation.message = 'Campaign launched successfully!';
                        vm.formdata.confimation.description = 'You can view the campaign on "Manage Campaigns"';
                        campaignSrvc.launchCampaign({ "campaign_id": vm.formdata.segment.campaign_id }).then(function (response) {
                            if (response.data.Result != "Success") {
                                validationPass = false;
                                vm.launching = false
                                vm.messageBox(response.data.Message);
                                // vm.messageBox("Failed to launch campaign");
                                return;
                            }
                            vm.launching = false
                            WizardHandler.wizard().next();
                        }, function () {
                            validationPass = false;
                            //  vm.messageBox("Failed to launch campaign");
                            return;
                        });
                    }

                }, function (error) {
                    vm.launching = false;
                });




            };


            //}


        },


        controllerAs: 'vm'
    });
})();