(function () {
    var app = angular.module('app');
    app.component('subscriberSegmentation', {
        bindings: {
        },
        templateUrl: 'app/components/codeImplementation/subscriber-segmentation/subscriber-segmentation.html',
        controller: ['$scope', '$cookies', '$location', '$uibModal', 'masterSrvc', 'codeImplementationSrvc', '$state', 'message', 'MessageBoxSrvc', function ($scope, $cookies, $location, $uibModal, masterSrvc, codeImplementationSrvc, $state, message, MessageBoxSrvc) {
            var vm = this;
            vm.segmentTypeList = [];
            vm.selectedSegmentType = "";
            vm.segmentName = "";
            vm.segmentId = $state.params.id;

            vm.addOtherOption = function () {
                vm.segmentTypeList = vm.segmentTypeList.filter(function (item) {
                    return item.DisplayText.toLowerCase() != "other";
                });
                vm.segmentTypeList.push({ "Value": "other", "DisplayText": "Other" });
            }

            vm.renderSegmentType = function () {
                masterSrvc.getSegmentTypes().then(function (response) {
                    vm.segmentTypeList = response.Records;
                    vm.addOtherOption();
                    vm.selectedSegmentType = vm.segmentTypeList.length > 0 ? vm.segmentTypeList[0].Value : "";
                    if (vm.segmentId) {
                        vm.fetchSegmentById(vm.segmentId);
                        vm.isSegmentTypeEditable();
                    }
                }, function (response) {
                    //console.log(response);
                });
            }

            vm.renderSegmentType();

            vm.addNewSegmentType = function () {
                if (vm.newSegmentType) {
                    if (vm.newSegmentType.toLowerCase() == "other") {
                        vm.messageBox(message.segmentation.otherSegmentTypeName);
                        return;
                    }
                    var checkDuplicate = vm.segmentTypeList.filter(function (item) {
                        return item.DisplayText.toLowerCase() == vm.newSegmentType.toLowerCase();
                    })
                    if (checkDuplicate.length > 0) {
                        vm.messageBox(message.segmentation.segmentTypeExist);
                        return;
                    }
                    vm.saveSegmentType(vm.newSegmentType);
                }
                else {
                    vm.messageBox(message.segmentation.segmentTypeName);
                    return;
                }
            }

            vm.saveSegmentType = function (newSegmentType) {
                if (newSegmentType) {
                    var obj = { "segmentTypeId": 0, "segmentTypeName": newSegmentType };
                    codeImplementationSrvc.saveSegmentType(obj).then(function (response) {
                        vm.segmentTypeList.push({ "Value": response.data.Record.segmentTypeId, "DisplayText": response.data.Record.segmentTypeName });
                        vm.selectedSegmentType = response.data.Record.segmentTypeId.toString();
                    }, function (response) {
                        //console.log(response);
                    })
                }
            }

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

            vm.saveSegment = function () {
                if (vm.segmentCurrentValue != vm.segmentName) {
                    codeImplementationSrvc.checkSegmentExist({ "segmentName": vm.segmentName, "segmentId": 1 }).then(function (response) {
                        if (response.data.responseCode == 200) {
                            vm.segmentExist = true;
                            vm.messageBox(message.segmentation.segmentNameExist);
                            return;
                        }
                        else {
                            vm.segmentId ? vm.editSegment() : vm.saveNewSegment();
                        }
                    }, function (response) {
                        //console.log(response);
                    });
                }
                else if (vm.selectedSegmentType != vm.currentSegmentType) {
                    vm.segmentId ? vm.editSegment() : vm.saveNewSegment();
                }
            }

            vm.fetchSegmentById = function (segmentId) {
                codeImplementationSrvc.getSegmentById({ 'segmentId': segmentId }).then(function (response) {
                    vm.segmentName = response.data.Record.segmentName;
                    vm.segmentCurrentValue = vm.segmentName;
                    vm.selectedSegmentType = response.data.Record.segmentTypeID.toString();
                    vm.currentSegmentType = vm.selectedSegmentType;
                }, function (response) {
                    // console.log(response);
                });
            }



            vm.validateAndSaveSegment = function () {
                if (!vm.segmentName) {
                    vm.messageBox(message.segmentation.segmentationNameRequire);
                    return false;
                }
                vm.saveSegment();
            }


            vm.successMessageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/success.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                             $state.go('iopush.auth.manageSegments');
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
            vm.editSegment = function (nameOrType) {

                codeImplementationSrvc.saveSegmentation({ "segmentId": vm.segmentId, "segmentName": vm.segmentName, "segmentTypeID": vm.selectedSegmentType })
                    .then(function (response) {
                        vm.successMessageBox(message.segmentation.updatedSegment);
                        // vm.displayConfirmationBox(response);
                    }, function (response) {
                        //console.log(response);
                    });
            }

            vm.saveNewSegment = function () {
                var newSegment = { "segmentName": vm.segmentName, "segmentTypeID": vm.selectedSegmentType, "segmentId": 0 };
                if (vm.selectedSegmentType == "other") {
                    vm.messageBox(message.segmentation.otherSegmentTypeName);
                    return;
                }

                codeImplementationSrvc.saveSegmentation(newSegment).then(function (response) {
                    vm.displayConfirmationBox(response);
                    vm.segmentName = "";
                }, function (response) {
                    //console.log(response);
                });
            }

            vm.displayConfirmationBox = function (response) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/components/codeImplementation/subscriber-segmentation/segment-confirmation.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', '$location', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage, $location) {
                        this.headerMsg = "SUCCESSFULLY ADDED";
                        this.closeModal = function () {
                            $uibModalInstance.dismiss();
                        };
                        this.navigateToOtherState = function (param) {
                            switch (param) {
                                case 'new':
                                    $state.go('iopush.auth.subscriberSegmentation', {}, { reload: true });
                                    break;
                                case 'manage':
                                    $state.go('iopush.auth.manageSegments');
                                    break;
                            }
                        }

                        this.hash_value = response.data.Record.hash;
                        //this.scriptCode="<script type='text/javascript'>\nfunction ___iopush_Subscribe___()\n{\n\treturn {'_hashValue':'"+this.hash_value+"'}\n}\n</script>";
                        this.currentHostURL = $location.protocol() + "://" + $location.host();
                        userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                        if (userCookiedData) {
                            this.pid = userCookiedData.pid;
                        }
                        this.scriptCode = "<script> (function(){\n  var iopush = document.createElement('script'); \n iopush_el = document.getElementsByTagName('script')[0]; \n iopush.async=false; \n iopush.src='" + this.currentHostURL + "/iopush.js'; \n iopush.id='iopush_messaging_script'; \n iopush_el.parentNode.insertBefore(iopush,iopush_el); \n iopush.onload = function(){  \n var s = document.createElement('script'),\n    el = document.getElementsByTagName('script')[0];\n  s.async = true;\n    s.src='" + this.currentHostURL + "/subscription/permission.js?rndstr=" + Date.now() + "&pid=" + this.pid + "&segmentId=" + this.hash_value + "';\n  s.id='myScript';   el.parentNode.insertBefore(s, el);}; })();\n</script>"

                    }
                    ],
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        confirmationMessage: function () {
                            return "default";
                        }
                    },
                    controllerAs: "vm"
                });
            }

            vm.isSegmentTypeEditable = function () {
                masterSrvc.getTotalMatchingUsers({ "segmentId": vm.segmentId }).then(function (response) {
                    vm.matchingUserCount = response.data.TotalRecordCount;
                },
                    function (response) {
                        //console.log(response);
                        vm.matchingUserCount = 0;
                    }
                );
            }


        }],
        controllerAs: 'vm'
    });
})();   