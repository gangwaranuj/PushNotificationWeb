(function () {
    angular.module('app').factory('MessageBoxSrvc', ['$uibModal', function ($uibModal) {
        var service = {};
        service.warningMessageBox = function (confirmationMessage) {
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

        service.successMessageBox = function (confirmationMessage) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/shared/templates/success.html',
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

        service.campaignSummaryDetail = function (summaryDetails) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/shared/templates/campaignSummary.html',
                controller: ['$scope', '$uibModalInstance', '$state', 'summaryDetails', '$timeout', function (modalScope, $uibModalInstance, $state, summaryDetails, $timeout) {
                    modalScope.summaryDetails = summaryDetails;
                    //console.log("summaryDetails",summaryDetails);
                    modalScope.closeModal = function () {
                        $uibModalInstance.dismiss();
                    };
                    modalScope.showImage = false;

                    modalScope.setImage = function () {

                        if (modalScope.showImage === false) {
                            modalScope.showImage = true;
                        }
                        else {
                            modalScope.showImage = false;
                        }
                    };

                }
                ],
                backdrop: 'static',
                size: 'md',
                resolve: {
                    summaryDetails: function () {
                        return summaryDetails;
                    }
                }
            });
        };
        service.welcomeSummaryDetail = function (summaryDetails) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/shared/templates/welcomeSummary.html',
                controller: ['$scope', '$uibModalInstance', '$state', 'summaryDetails', '$timeout', function (modalScope, $uibModalInstance, $state, summaryDetails, $timeout) {
                    modalScope.summaryDetails = summaryDetails;
                    //console.log("summaryDetails",summaryDetails);

                    modalScope.showImage = false;

                    modalScope.setImage = function () {

                        if (modalScope.showImage === false) {
                            modalScope.showImage = true;
                        }
                        else {
                            modalScope.showImage = false;
                        }
                    };
                    modalScope.closeModal = function () {
                        $uibModalInstance.dismiss();
                    };

                }
                ],
                backdrop: 'static',
                size: 'md',
                resolve: {
                    summaryDetails: function () {
                        return summaryDetails;
                    }
                }
            });
        };

        service.rssFeedCampaignSummaryDetail = function (summaryDetails) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/shared/templates/rssfeedCampaignSummary.html',
                controller: ['$scope', '$uibModalInstance', '$state', 'summaryDetails', '$timeout', function (modalScope, $uibModalInstance, $state, summaryDetails, $timeout) {
                    modalScope.summaryDetails = summaryDetails;
                    //console.log("summaryDetails",summaryDetails);

                    modalScope.showImage = false;

                    modalScope.setImage = function () {

                        if (modalScope.showImage === false) {
                            modalScope.showImage = true;
                        }
                        else {
                            modalScope.showImage = false;
                        }
                    };

                    modalScope.closeModal = function () {
                        $uibModalInstance.dismiss();
                    };

                }
                ],
                backdrop: 'static',
                size: 'md',
                resolve: {
                    summaryDetails: function () {
                        return summaryDetails;
                    }
                }
            });
        };

        return service;
    }]);
})();