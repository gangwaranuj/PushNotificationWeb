(function () {
    var app = angular.module('app');
    app.component('manageSegmentType', {
        bindings: {},
        templateUrl: 'app/components/codeImplementation/manage-segments-type/manage-segment-type.html',
        controller: ['$scope', 'campaignSrvc', '$uibModal', '$state', '$cookies', 'MessageBoxSrvc', 'masterSrvc', 'message', 'codeImplementationSrvc', function ($scope, campaignSrvc, $uibModal, $state, $cookies, MessageBoxSrvc, masterSrvc, message, codeImplementationSrvc) {
            var vm = this;
            vm.limit = 15;
            vm.maxSize = 1;
            vm.currentPage = 1;
            vm.skip = (vm.currentPage - 1) * vm.limit;
            vm.count = 0;
            vm.editClicked = false;
            vm.handler = {
                currentPage: vm.currentPage,
                maxSize: vm.maxSize,
                totalCount: Number(vm.count),
                limit: vm.limit
            };
            vm.segments = {};

            vm.search = function () {
                vm.loadSegments(vm.limit, vm.skip);
            };

            var _getSegmentTypes = (function () {
                masterSrvc.getSegmentTypes().then(function (response) {

                    vm.segments = response.Records;
                }).then(function (response) { })
            })();

            vm.deleteconfirmationMessage = function (confirmationMessage, id, campaignTypeId) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation-modal.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout','message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout,message) {
                        modalScope.confirmationMessage = confirmationMessage;
                        modalScope.del = true;
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            //vm.loadSegments(vm.limit, vm.skip);
                        };
                        modalScope.confirmNo = function () {
                            $uibModalInstance.close();
                        };
                        modalScope.confirmYes = function () {
                            modalScope.confirmationMessage = "Segment deleted";
                            modalScope.del = false;
                            codeImplementationSrvc.deleteSegment({ "segmentId": id });
                            vm.yes = true;
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
            }
            vm.edit = function (indx) {
                //console.log("index",indx);
                vm.editClicked[indx] = true;
                vm.index = indx;
            };
            vm.saveChanges = function () {
                //console.log("indx",vm.index,vm.segments[vm.index]);
                if (vm.segmentTypeName) {
                    var obj = { "segmentTypeId": vm.segments[vm.index].Value, "segmentTypeName": vm.segments[vm.index].DisplayText };
                    codeImplementationSrvc.saveSegmentType(obj).then(function (response) {
                        // vm.segmentTypeList.push({ "Value": response.data.Record.segmentTypeId, "DisplayText": response.data.Record.segmentTypeName });
                        // vm.selectedSegmentType = response.data.Record.segmentTypeId.toString();
                        vm.editClicked[vm.index] = false;
                        vm.index;              
                    }, function (response) {
                        console.log(response);
                    })
                }
            }

        }],
        controllerAs: 'vm'
    });
})();