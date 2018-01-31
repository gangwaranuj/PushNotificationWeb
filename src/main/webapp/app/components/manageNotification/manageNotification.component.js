(function () {
    var app = angular.module('app');
    app.component('manageWelcomeNotification', {
        bindings: {},
        templateUrl: 'app/components/manageNotification/manageNotification.html',
        controller: ['$scope', 'campaignSrvc', '$uibModal', '$state', '$cookies', 'MessageBoxSrvc', 'masterSrvc', 'message', 'utilitySrvc', function ($scope, campaignSrvc, $uibModal, $state, $cookies, MessageBoxSrvc, masterSrvc, message, utilitySrvc) {

            var vm = this;
            vm.limit = 15;
            vm.maxSize = 1;
            vm.currentPage = 1;
            vm.skip = function () { return (vm.currentPage - 1) * vm.limit; };
            vm.count = 0;
            vm.live = true;
            vm.pending = true;
            vm.expired = true;
            vm.draft = true;
            vm.welcomeName = "";
            var segmentDetail;
            vm.segments = {};
            vm.summaryDetails = {};
            vm.columnForOrdering = 'welcomeId';
            vm.requiredOrder = 'desc'
            vm.sortOrder = false;
            var cityDetail;
            var isps;
            vm.colNameArray = ['welcomeId', 'welcomeName', 'welcomeStatus', 'welcomeScheduleDate', 'modificationDate', 'platform'];
            var playStatus = "io-icon io-md-icon io-successful";
            var failedStatus = "io-icon io-md-icon io-failled";
            var pauseStatus = "io-icon io-md-icon io-saved";
            vm.summaryDetails = {
                targetGroup: "",
                platform: {
                    selectedOptions: [],
                    options: [
                    ]

                },
                welcomeName: "",
                welcomeScheduleDate: "",
                welcomeEndDate: "",
                subscribed: "",
                countries: {
                    selectedOptions: [],
                    options: [
                    ]

                },

                cities: {
                    selectedOptions: [],
                    options: [
                    ]
                },
                internetProviders: {
                    selectedOptions: [],
                    options: [
                    ]
                },
                segmentTypes: {
                    selectedOptions: [],
                    options: [
                    ]

                },
                segments: {
                    selectedOptions: [],
                    options: [
                    ]

                }
            };
            vm.handler = {
                currentPage: vm.currentPage,
                maxSize: vm.maxSize,
                totalCount: Number(vm.count),
                limit: vm.limit
            }
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
                        vm.loadWelcomeMessages(vm.limit, vm.skip());
                    }
                    else {
                        $('#' + vm.colNameArray[i]).addClass('iosortsearch');
                        $('#' + vm.colNameArray[i]).removeClass('iosortup');
                        $('#' + vm.colNameArray[i]).removeClass('iosortdown');
                    }
                }
            }
            vm.search = function () {
                vm.loadWelcomeMessages(vm.limit, vm.skip());
            };
            vm.loadWelcomeMessages = function (limit, pageIndex) {
                var filter = {
                    pending: vm.pending ? 1 : 0,
                    expired: vm.expired ? 1 : 0,
                    draft: vm.draft ? 1 : 0,
                    live: vm.live ? 1 : 0,
                    startIndex: pageIndex,
                    pageSize: limit,
                    welcomeName: vm.welcomeName,
                    columnForOrdering: vm.columnForOrdering,
                    requiredOrder: vm.requiredOrder
                };
                var data;
                if (filter.pending === 0 && filter.expired === 0 && filter.draft === 0 && filter.live === 0) {
                    filter.pending = 1;
                    filter.expired = 1;
                    filter.draft = 1;
                    filter.live = 1;
                }

                campaignSrvc.listWelcomeNotification(filter).then(function (response) {
                    data = response.data;
                    // console.log(data);
                    if (response.data.Result === "Success") {
                        vm.welcomeMessages = response.data.Records;
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
                            vm.loadWelcomeMessages(limit, skip);
                        };
                        if (vm.welcomeMessages) {
                            vm.welcomeMessages = vm.welcomeMessages.map(function (item) {
                                if (item.welcomeStatus === 1) {
                                    item.view = true;
                                    item.edit = false;
                                    item.del = false;
                                    item.pause = false;
                                    item.play = true;
                                    item.status = "Live";
                                    item.cssClass = "status-btn status-live";
                                }
                                else if (item.welcomeStatus === 3) {
                                    item.view = true;
                                    item.edit = false;
                                    item.del = false;
                                    item.pause = false;
                                    item.play = false;
                                    item.status = "Expired";
                                    item.cssClass = "status-btn status-expired";
                                }
                                else if (item.welcomeStatus === 2) {
                                    item.view = false;
                                    item.edit = true;
                                    item.del = true;
                                    item.pause = true;
                                    item.play = false;
                                    item.status = "Pending";
                                    item.cssClass = "status-btn status-draft";
                                }
                                else if (item.welcomeStatus === 4) {
                                    item.view = false;
                                    item.edit = true;
                                    item.del = true;
                                    item.pause = true;
                                    item.play = false;
                                    item.status = "Draft";
                                    item.cssClass = "status-btn status-pending";
                                }

                                if (vm.columnForOrdering !== 'platform') {
                                    if (!item.segmented) {
                                        item.platform = 'Chrome / Firefox / Opera / Android'
                                    }
                                    else {
                                        var platform = item.platform.split(',');
                                        // var platform = "2,3,1,5";
                                        if (platform.length > 0 && platform[0] != "") {
                                            item.platform = "";
                                            for (var i = 0; i < platform.length; i++) {

                                                if (platform[i] === "1") {
                                                    if (item.platform != "")
                                                        item.platform = item.platform.concat(' / Chrome');
                                                    else
                                                        item.platform = item.platform.concat('Chrome');
                                                }
                                                if (platform[i] === "2") {
                                                    if (item.platform != "")
                                                        item.platform = item.platform.concat(' / Firefox');
                                                    else
                                                        item.platform = item.platform.concat('Firefox');
                                                }
                                                if (platform[i] === "3") {
                                                    if (item.platform != "")
                                                        item.platform = item.platform.concat(' / Opera');
                                                    else
                                                        item.platform = item.platform.concat('Opera');
                                                }
                                                // if (platform[i] === "4") {
                                                //     if (item.platform != "")
                                                //         item.platform = item.platform.concat(' / Safari');
                                                //     else
                                                //         item.platform = item.platform.concat('Safari');
                                                // }
                                                if (platform[i] === "5") {
                                                    if (item.platform != "")
                                                        item.platform = item.platform.concat(' / Android');
                                                    else
                                                        item.platform = item.platform.concat('Android');
                                                }
                                            }
                                        }
                                        else {
                                            item.platform = 'Chrome / Firefox / Opera / Android';
                                        }
                                    }
                                }
                                return item;
                            });
                        }
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
            $scope.$watch("vm.summaryDetails.countries.selectedOptions", function (newval, oldval) {
                var countryIDStr;
                if (newval.length == 1) {
                    _getCitiesByCountryId(newval[0].DropdownID);
                    _getInternetProvider(newval[0].DropdownID);

                }
                else if (newval.length > 1) {
                    for (var i = 0; i < newval.length; i++) {
                        if (countryIDStr)
                            countryIDStr = countryIDStr + ',' + (newval[i].DropdownID.toString());
                        else
                            countryIDStr = (newval[i].DropdownID.toString());
                    }
                    _getInternetProvider(countryIDStr);
                }
            });

            $scope.$watch("vm.summaryDetails.segmentTypes.selectedOptions", function (newval, oldval) {
                var segmentTypeIDStr = '';
                if (newval.length == 0) {
                    vm.segments.options = [];
                    vm.segments.selectedOptions = [];

                }
                else if (newval.length === 1) {

                    _getSegments(newval[0].Value);
                }
                else if (newval.length > 1) {

                    for (var i = 0; i < newval.length; i++) {
                        if (segmentTypeIDStr)
                            segmentTypeIDStr = segmentTypeIDStr + ',' + (newval[i].Value.toString());
                        else
                            segmentTypeIDStr = (newval[i].Value.toString());
                    }
                    _getSegments(segmentTypeIDStr);
                }
            });


            var _getCountries = (function () {
                campaignSrvc.getCountriesTimeZones().then(function (response) {
                    vm.summaryDetails.countries.options = response.Records
                }).then(function (response) { })
            })();
            var _getPlatforms = (function () {
                campaignSrvc.getPlatforms().then(function (response) {
                    vm.summaryDetails.platform.options = response.Records
                }).then(function (response) { })
            })();

            var _getSegments = function (segmenttypeIds) {

                masterSrvc.getSegments(segmenttypeIds).then(function (response) {
                    if (response.Result === "Success") {
                        vm.summaryDetails.segments.options = response.Records.map(function (record) {
                            record.DisplayText = record.DisplayText;
                            return record;
                        });
                    }
                    else {
                        vm.segments.options = [];
                    }

                    if (segmentDetail && segmentDetail.length > 0 && segmentDetail[0] !== "") {
                        // vm.ISP = true;
                        vm.summaryDetails.segments.selectedOptions = vm.summaryDetails.segments.options.filter(function (segment) {
                            return segmentDetail.includes(segment.Value.toString());
                        })
                    }

                });
            };

            var _getCitiesByCountryId = function (countryId) {
                campaignSrvc.getCitiesByCountryId(countryId).then(function (response) {
                    if (response.data.Result === "Success") {
                        vm.summaryDetails.cities.options = response.data.Records.map(function (record) {
                            record.DisplayText = record.DisplayText;
                            return record;
                        });
                    }
                    else {
                        vm.form.segment.cities.options = [];
                    }
                    if (cityDetail && cityDetail.length > 0 && cityDetail[0] !== "") {
                        vm.summaryDetails.cities.selectedOptions = vm.summaryDetails.cities.options.filter(function (city) {
                            return cityDetail.includes(city.DropdownID.toString());
                        })
                    }
                })
            }

            var _getInternetProvider = function (countryId) {
                campaignSrvc.getISPByCountryId(countryId).then(function (response) {
                    if (response.data.Result === "Success") {
                        vm.summaryDetails.internetProviders.options = response.data.Records.map(function (record) {
                            record.DisplayText = record.DisplayText;
                            return record;
                        });
                    }
                    else {
                        vm.form.segment.internetProviders.options = [];
                    }
                    if (isps && isps.length > 0 && isps[0] !== "") {
                        vm.summaryDetails.internetProviders.selectedOptions = vm.summaryDetails.internetProviders.options.filter(function (ISP) {
                            return isps.includes(ISP.Value.toString());
                        })
                    }
                })
            }

            var _getSegmentTypes = (function () {
                masterSrvc.getSegmentTypes().then(function (response) {

                    vm.summaryDetails.segmentTypes.options = response.Records;
                }).then(function (response) { })
            })();


            vm.viewSummary = function (id) {
                campaignSrvc.getWelcomeById({ welcomeId: id }).then(function (response) {
                    if (response.data.Result === "Success") {
                        //console.log("response.data.Result",response.data);
                        var summaryDetails = response.data.Record;
                        if (summaryDetails.segmented == true)
                            vm.summaryDetails.targetGroup = 'Segmented';
                        else if (summaryDetails.segmented == false)
                            vm.summaryDetails.targetGroup = 'ALL SUBSCRIBERS';
                        vm.summaryDetails.welcomeName = summaryDetails.welcomeName;
                        vm.summaryDetails.welcomeScheduleDate = summaryDetails.welcomeScheduleDate;
                        vm.summaryDetails.welcomeEndDate = summaryDetails.welcomeEndDate;
                        vm.summaryDetails.subscribed = summaryDetails.subscribed;
                        vm.summaryDetails.title = summaryDetails.title;
                        vm.summaryDetails.description = summaryDetails.description;
                        vm.summaryDetails.forwardUrl = summaryDetails.forwardUrl;
                        vm.summaryDetails.imagePath = summaryDetails.imagePath;
                        vm.summaryDetails.issegmented = summaryDetails.segmented;
                        vm.segmentSelected = summaryDetails.segmentSelected.split(',');

                        if (summaryDetails.platform && vm.segmentSelected[2] == "true") {
                            var platforms = summaryDetails.platform.split(',');
                            if (platforms.length > 0 && platforms[0] != "") {
                                vm.summaryDetails.platform.selectedOptions = vm.summaryDetails.platform.options.filter(function (platform) {
                                    return platforms.includes(platform.DropdownID.toString());
                                })
                            }
                        }
                        else {
                            vm.summaryDetails.platform.selectedOptions = [];
                        }

                        if (summaryDetails.countries && vm.segmentSelected[0] == "true") {
                            var countries = summaryDetails.countries.split(',');
                            if (countries.length > 0 && countries[0] != "") {
                                vm.summaryDetails.countries.selectedOptions = vm.summaryDetails.countries.options.filter(function (country) {
                                    return countries.includes(country.DropdownID.toString());
                                })
                            }
                        }
                        else {
                            vm.summaryDetails.countries.selectedOptions = [];
                        }

                        if (summaryDetails.isps && vm.segmentSelected[3] == "true") {
                            isps = summaryDetails.isps.split(',');
                            if (isps.length > 0 && isps[0] !== "") {

                                vm.summaryDetails.internetProviders.selectedOptions = vm.summaryDetails.internetProviders.options.filter(function (ISP) {
                                    return isps.includes(ISP.Value.toString());
                                })
                            }
                            else {
                                vm.summaryDetails.internetProviders.selectedOptions = [];
                            }
                        }
                        else {
                            vm.summaryDetails.internetProviders.selectedOptions = [];
                        }


                        if (summaryDetails.segmentTypes && vm.segmentSelected[4] === "true") {
                            var segmentTypes = summaryDetails.segmentTypes.split(',');
                            if (segmentTypes.length > 0 && segmentTypes[0] != "") {
                                vm.summaryDetails.segmentTypes.selectedOptions = vm.summaryDetails.segmentTypes.options.filter(function (segmentType) {
                                    return segmentTypes.includes(segmentType.Value.toString());
                                })
                            }
                        }
                        else {
                            vm.summaryDetails.segmentTypes.selectedOptions = [];
                        }

                        if (summaryDetails.segments && vm.segmentSelected[5] === "true") {
                            segmentDetail = summaryDetails.segments.split(',');
                            if (segmentDetail.length > 0 && segmentDetail[0] != "") {
                                vm.summaryDetails.segments.selectedOptions = vm.summaryDetails.segments.options.filter(function (segment) {
                                    return segmentDetail.includes(segment.Value.toString());
                                })
                            }
                        }
                        else {
                            vm.summaryDetails.segments.selectedOptions = [];
                        }


                        if (summaryDetails.cities && vm.segmentSelected[1] == "true") {
                            cityDetail = summaryDetails.cities.split(',');
                            if (cityDetail.length > 0 && cityDetail[0] !== "") {

                                vm.summaryDetails.cities.selectedOptions = vm.summaryDetails.cities.options.filter(function (city) {
                                    return cityDetail.includes(city.DropdownID.toString());
                                })
                            }
                            else {
                                vm.summaryDetails.cities.selectedOptions = [];
                            }
                        }
                        else {
                            vm.summaryDetails.cities.selectedOptions = [];
                        }
                        //console.log("vm.summaryDetails",vm.summaryDetails);
                        MessageBoxSrvc.welcomeSummaryDetail(vm.summaryDetails);
                    }

                });

            };
            vm.loadWelcomeMessages(vm.limit, vm.skip());
            vm.deleteconfirmationMessage = function (confirmationMessage, id) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation-modal.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', 'MessageBoxSrvc', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message, MessageBoxSrvc) {
                        modalScope.confirmationMessage = message.manageWelcome.deleteWelcomeConfirmation;
                        modalScope.del = true;
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.loadWelcomeMessages(vm.limit, vm.skip());
                        };
                        modalScope.confirmNo = function () {
                            $uibModalInstance.close();
                            vm.loadWelcomeMessages(vm.limit, vm.skip());
                        };
                        modalScope.confirmYes = function () {

                            campaignSrvc.deleteWelcome({ "welcomeId": id }).then(function (response) {

                                if (response.data.responseCode == 200) {
                                    modalScope.confirmationMessage = message.manageWelcome.deleteWelcome;
                                    modalScope.del = false;
                                }
                                else if (response.data.responseCode == 206) {
                                    $uibModalInstance.close();
                                    MessageBoxSrvc.warningMessageBox(message.manageWelcome.deleteWelcomeFailure);
                                }
                                else {
                                    $uibModalInstance.close();
                                    MessageBoxSrvc.warningMessageBox(message.error.internalError);
                                }

                            });;
                            vm.yes = true;
                            // $timeout(function () {
                            //     $uibModalInstance.dismiss();
                            //     vm.loadWelcomeMessages(vm.limit, vm.skip);
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
            vm.edit = function (id) {
                $state.go('iopush.auth.editWelcomeNotification', { id: id });
            };

            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [year, month, day].join('-');
            }
            function formatDate2(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [day, month, year].join('/');
            }
            function formatDate3(date) {
                var dateNow = date.split('/');
                return [dateNow[0], dateNow[1], dateNow[2]].join('-');
            }
            vm.launchConfirmationMessage = function (confirmationMessage, id, welcomestartdate, welcomeenddate, isActive, status) {
                var welcomeStatus;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/message.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message) {
                        var currentDateTime = new Date();//new Date()
                        currentDateTime.setMinutes(currentDateTime.getMinutes() + 15);
                        var csscls = "io-icon io-md-icon io-successful";
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                        };

                        if ((status === 4)) {
                            modalScope.confirmationMessage = { msg: message.manageWelcome.draftWelcomeLaunching, css: csscls };
                        }
                        if (((welcomestartdate) > formatDate2(currentDateTime)) && (status === 2)) {
                            modalScope.confirmationMessage = { msg: message.manageWelcome.notification + formatDate3(welcomestartdate) + '.', css: csscls };
                        }
                        else if ((status === 1 || status === 2)) {
                            if (status == 1)
                                welcomeStatus = 2;
                            else if (status == 2)
                                welcomeStatus = 1;
                            if (isActive == true)
                                isActive = false;
                            else if (isActive == false)
                                isActive = true;
                            if ((new Date(welcomeenddate)) < (currentDateTime)) {

                                campaignSrvc.expireWelcome({ "welcomeId": id }).then(function (response) {

                                    if (response.data.responseCode == 200) {
                                        modalScope.confirmationMessage = { msg: message.manageWelcome.welcomeExpireMessage, css: failedStatus };

                                        vm.loadWelcomeMessages(vm.limit, vm.skip());
                                    }
                                    else if (response.data.responseCode == 206) {
                                        modalScope.confirmationMessage = { msg: message.manageWelcome.expireWelcomeFailure, css: failedStatus };
                                    }
                                    else {
                                        modalScope.confirmationMessage = message.error.internalError;
                                    }

                                });

                            }
                            else {
                                campaignSrvc.changeWelcomeStatus({ "welcomeId": id, "welcomeStatus": welcomeStatus, "active": isActive }).then(function (response) {
                                    if (response.data.responseCode == 200) {

                                        if (welcomeStatus == 1)
                                            modalScope.confirmationMessage = { msg: message.manageWelcome.activated, css: playStatus };
                                        else if (welcomeStatus == 2)
                                            modalScope.confirmationMessage = { msg: message.manageWelcome.paused, css: pauseStatus };

                                        vm.loadWelcomeMessages(vm.limit, vm.skip());
                                    }
                                    else if (response.data.responseCode == 206) {
                                        modalScope.confirmationMessage = { msg: message.manageWelcome.changeStatusWelcomeFailure, css: failedStatus };
                                    }
                                    else {
                                        modalScope.confirmationMessage = message.error.internalError;
                                    }
                                });
                            }
                            //  vm.loadWelcomeMessages(vm.limit, vm.skip);
                        }
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                        };
                        // $timeout(function () {
                        //     $uibModalInstance.dismiss();
                        // }, 5000);
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
        }],
        controllerAs: 'vm'
    });
})();