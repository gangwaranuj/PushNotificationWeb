(function () {
    var app = angular.module('app');
    app.component('manageSegment', {
        bindings: {},
        templateUrl: 'app/components/codeImplementation/manage-segments/manage-segment.html',
        controller: ['$scope', 'campaignSrvc', '$uibModal', '$state', '$cookies', 'MessageBoxSrvc', 'masterSrvc', 'message', 'codeImplementationSrvc','$location', function ($scope, campaignSrvc, $uibModal, $state, $cookies, MessageBoxSrvc, masterSrvc, message, codeImplementationSrvc,$location) {
            var vm = this;
            vm.limit = 15;
            vm.maxSize = 1;
            vm.currentPage = 1;
            vm.skip = (vm.currentPage - 1) * vm.limit;
            vm.count = 0;
            vm.columnForOrdering = 'segmentId';
            vm.requiredOrder = 'desc'
            vm.sortOrder = false;
            vm.colNameArray = ['segmentId', 'segmentName', 'segmentType.segmentTypeName', 'createdOn', 'modifiedOn'];
            vm.handler = {
                currentPage: vm.currentPage,
                maxSize: vm.maxSize,
                totalCount: Number(vm.count),
                limit: vm.limit
            };

            vm.search = function () {
                vm.loadSegments(vm.limit, vm.skip);
            };

            vm.loadSegments = function (limit, pageIndex) {
                var filter = {

                    startIndex: pageIndex,
                    pageSize: limit,
                    columnForOrdering: vm.columnForOrdering,
                    requiredOrder: vm.requiredOrder

                };
                var data;
                codeImplementationSrvc.getSegmentations(filter).then(function (response) {
                    data = response.data;
                    // console.log(data);
                    if (response.data.Result === "Success") {
                        vm.segments = response.data.Records;
                        vm.count = response.data.TotalRecordCount;
                        vm.handler = {
                            currentPage: vm.currentPage,
                            maxSize: vm.maxSize,
                            totalCount: Number(vm.count),
                            limit: vm.limit,
                            totalpages: vm.count === 0 ? 1 : parseInt(((Number(vm.count) - 1) / vm.limit) + 1)
                        };
                        vm.onAction = function (currentpage, limit, skip) {
                            vm.currentPage = currentpage;
                            vm.loadSegments(limit, skip);
                        };
                        //console.log("vm.campaigns",vm.campaigns);

                    }
                    else if (response.data.Result === "401") {
                        //$cookies.remove('acitveMenu');
                        $state.go('iopush.unauth.login');
                    }
                    else {
                        console.log("some error text");
                    }
                }, function (response) {
                    console.log('error');
                });
            };

            vm.sortingFunc = function (colName) {
                vm.requiredOrder = vm.sortOrder ? "asc" : "desc";
                vm.sortOrder = !vm.sortOrder;
                vm.columnForOrdering = colName;
                for (var i = 0; i < vm.colNameArray.length; i++) {
                    if (vm.colNameArray[i] == colName) {
                        vm.currentPage = 1;
                        if (vm.requiredOrder == "asc") {
                            $('#' + colName).removeClass('iosortdown');
                            $('#' + colName).addClass('iosortup');
                        }
                        else {
                            $('#' + colName).removeClass('iosortup');
                            $('#' + colName).addClass('iosortdown');
                        }
                        $('#' + colName).removeClass('iosortsearch');
                        vm.loadSegments(vm.limit, vm.skip);
                    }
                    else {
                        $('#' + vm.colNameArray[i]).addClass('iosortsearch');
                        $('#' + vm.colNameArray[i]).removeClass('iosortup');
                        $('#' + vm.colNameArray[i]).removeClass('iosortdown');
                    }
                }
            };

            vm.loadSegments(vm.limit, vm.skip);
            vm.deleteconfirmationMessage = function (confirmationMessage, id, campaignTypeId) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation-modal.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message) {
                        modalScope.confirmationMessage = confirmationMessage;
                        modalScope.del = true;
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.loadSegments(vm.limit, vm.skip);
                        };
                        modalScope.confirmNo = function () {
                            $uibModalInstance.close();
                        };
                        modalScope.confirmYes = function () {
                            modalScope.confirmationMessage = "Segment deleted";
                            modalScope.del = false;
                            codeImplementationSrvc.deleteSegment({ "segmentId": id });
                            vm.yes = true;
                            // $timeout(function () {
                            //     $uibModalInstance.dismiss();
                            //     vm.loadCampaigns(vm.limit, vm.skip);
                            // }, 5000);
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
            vm.edit = function (id, typeId) {
                $state.go('iopush.auth.subscriberSegmentationEdit', { id: id });
            };

            vm.viewSummary = function (id) {
                masterSrvc.getTotalMatchingUsers({ "segmentId": id }).then(function (response) {
                    vm.matchingUserCount = response.data.TotalRecordCount;
                },
                    function (response) {
                        //console.log(response);
                        vm.matchingUserCount = 0;
                    }
                );

                $scope.currentHostURL=$location.protocol() + "://" + $location.host() ;//+ ":" + $location.port();
                
                codeImplementationSrvc.getSegmentById({ 'segmentId': id }).then(function (response) {
                    vm.selectedSegmentType = response.data.Record.segmentTypeID.toString();
                     
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/components/codeImplementation/manage-segments/segment-view.html',
                        controller: ['$scope', '$uibModalInstance', '$state', '$timeout', '$location', 'confirmationMessage', function (modalScope, $uibModalInstance, $state, $timeout, $location, confirmationMessage) {
                            this.navigateToOtherState = function (param) {
                                switch (param) {
                                    case 'new':
                                        $state.reload();
                                        break;
                                    case 'manage':
                                        $state.go('iopush.auth.manageSegments');
                                        break;
                                }
                            }

                            this.hash_value = response.data.Record.hash;
                            this.headerMsg = "VIEW";
                            this.closeModal = function () {
                                $uibModalInstance.dismiss();
                            };
                            this.totalCount = vm.matchingUserCount;
                            this.currentHostURL = $location.protocol() + "://" + $location.host();
                            userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                            if (userCookiedData) {
                                this.pid = userCookiedData.pid;
                            }

                            this.scriptCode = "<script> (function(){\n  var iopush = document.createElement('script'); \n iopush_el = document.getElementsByTagName('script')[0]; \n iopush.async=false; \n iopush.src='" + $scope.currentHostURL + "/iopush.js'; \n iopush.id='iopush_messaging_script'; \n iopush_el.parentNode.insertBefore(iopush,iopush_el); \n iopush.onload = function(){  \n var s = document.createElement('script'),\n    el = document.getElementsByTagName('script')[0];\n  s.async = true;\n    s.src='" + $scope.currentHostURL + "/subscription/permission.js?rndstr=" + Date.now() + "&pid=" + this.pid + "&segmentId=" + this.hash_value + "';\n  s.id='myScript';   el.parentNode.insertBefore(s, el);}; })();\n</script>"

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
                }, function (response) {
                    //console.log(response);
                });


            };




        }],
        controllerAs: 'vm'
    });
})();