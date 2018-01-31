(function () {
    var app = angular.module('app');
    app.component('managepushtorss', {
        bindings: {},
        templateUrl: 'app/components/campaign/pushtorsslist/managepushtorss.campaign.html',
        controller: ['$scope', 'campaignSrvc', '$uibModal', '$state', '$cookies', 'MessageBoxSrvc', 'masterSrvc', function ($scope, campaignSrvc, $uibModal, $state, $cookies, MessageBoxSrvc, masterSrvc) {
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
            vm.columnForOrdering = 'id';
            vm.requiredOrder = 'desc'
            vm.sortOrder = false;
            vm.colNameArray = ['id', 'name', 'notification', 'modificationDate'];
            vm.rssName = "";
            vm.summaryDetails = {};
            var successCss = "io-icon io-md-icon io-successful";
            var failedCss = "io-icon io-md-icon io-failled";
            var inactiveCss = "io-icon io-md-icon io-saved";
            var segmentDetail;
            vm.summaryDetails = {
                targetGroup: "",
                platform: {
                    selectedOptions: [],
                    options: [
                    ]

                },
                campaign_name: "",
                campaign_schedule_date: "",
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
                        vm.loadCampaigns(vm.limit, vm.skip());
                    }
                    else {
                        $('#' + vm.colNameArray[i]).addClass('iosortsearch');
                        $('#' + vm.colNameArray[i]).removeClass('iosortup');
                        $('#' + vm.colNameArray[i]).removeClass('iosortdown');
                    }
                }
            };

            vm.search = function () {
                vm.loadCampaigns(vm.limit, vm.skip());
            };
            vm.loadCampaigns = function (limit, pageIndex) {
                var filter = {
                    inactive: vm.draft ? 1 : 0,
                    active: vm.live ? 1 : 0,
                    startIndex: pageIndex,
                    pageSize: limit,
                    columnForOrdering: vm.columnForOrdering,
                    requiredOrder: vm.requiredOrder,
                    name: vm.rssName

                };
                var data;
                campaignSrvc.getRSSFeedCampaigns(filter).then(function (response) {
                    data = response.data;
                    // console.log(data);
                    if (response.data.Result === "SUCCESS") {
                        vm.campaigns = response.data.Records;
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
                            vm.loadCampaigns(limit, skip);
                        };
                        //console.log("vm.campaigns",vm.campaigns);
                        vm.campaigns = vm.campaigns.map(function (item) {
                            if (item.notificationCode === 1) {
                                item.view = true;
                                item.edit = false;
                                item.del = false;
                                item.launch = false;
                                item.status = "Active";
                                item.pause = true;
                                item.cssClass = "status-btn status-live";
                            }

                            else {
                                item.view = false;
                                item.edit = true;
                                item.del = true;
                                item.launch = true;
                                item.status = "Inactive";
                                item.pause = false;
                                item.cssClass = "status-btn status-pending";

                            }

                            return item;
                        });
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
                    vm.summaryDetails.segments.options = [];
                    vm.summaryDetails.segments.selectedOptions = [];

                }
                else if (newval.length === 1) {

                    _getSegments(newval[0].Value);
                }

                else if (newval.length > 1) {
                    // $rootScope.timezone = "Europe/Zurich";
                    // $cookies.put('timezone', "Europe/Zurich");
                    // vm.cities.options = [];
                    // vm.cities.selectedOptions = [];
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

            var _getSegments = function (segmenttypeIds) {

                masterSrvc.getSegments(segmenttypeIds).then(function (response) {
                    if (response.Result === "Success") {
                        vm.summaryDetails.segments.options = response.Records.map(function (record) {
                            record.DisplayText = record.DisplayText;
                            return record;
                        });
                    }
                    else {
                        vm.summaryDetails.segments.options = [];
                    }

                    if (segmentDetail && segmentDetail.length > 0 && segmentDetail[0] !== "") {
                        // vm.ISP = true;
                        vm.summaryDetails.segments.selectedOptions = vm.summaryDetails.segments.options.filter(function (segment) {
                            return segmentDetail.includes(segment.Value.toString());
                        })
                    }

                });
            };


            var _getSegmentTypes = (function () {
                masterSrvc.getSegmentTypes().then(function (response) {

                    vm.summaryDetails.segmentTypes.options = response.Records;
                }).then(function (response) { })
            })();
            // vm.inActive = function (confirmationMessage, id) {

            //     campaignSrvc.pauseRSSPUSH({ "id": id, "active": 2 }).then(function (response) {
            //         if (response.data.responseCode === 200) {

            //             vm.loadCampaigns(vm.limit, vm.skip);
            //             vm.actionConfirmationMessage(confirmationMessage, inactiveCss);
            //             // modalScope.confirmationMessage = { msg: confirmationMessage, css: successCss };
            //         }
            //         else {
            //             //vm.messageBox("Failed to pause");
            //             modalScope.confirmationMessage = { msg: "Failed to pause RSS", css: failedCss };
            //         }
            //     });


            // };

            vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/warning.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message) {
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


            vm.viewSummary = function (id) {
                campaignSrvc.getRSSFeedById({ id: id }).then(function (response) {
                    if (response.data.Result === "SUCCESS") {
                        //console.log("response.data.Result",response.data);
                        var summaryDetails = response.data.Record;



                        vm.summaryDetails.name = summaryDetails.name;
                        vm.summaryDetails.url = summaryDetails.url;
                        vm.summaryDetails.showimagelink = summaryDetails.automatedImage === 0 ? true : false;
                        vm.summaryDetails.logo_path = summaryDetails.logo_path;
                        // vm.summaryDetails.segments = summaryDetails.segments;
                        // vm.summaryDetails.segmentTypes = summaryDetails.segmentTypes;


                        if (summaryDetails.platform) {
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
                        if (summaryDetails.countries) {
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

                        if (summaryDetails.segmentTypes) {
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

                        if (summaryDetails.segments) {
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

                        if (summaryDetails.isps) {
                            isps = summaryDetails.isps.split(',');
                            if (isps.length > 0 && isps[0] !== "") {

                                vm.summaryDetails.internetProviders.selectedOptions = vm.summaryDetails.internetProviders.options.filter(function (ISP) {
                                    return isps.includes(ISP.Value.toString());
                                })
                            }
                        }

                        else {
                            vm.summaryDetails.internetProviders.selectedOptions = [];
                        }
                   if(summaryDetails.cities) {
                        cityDetail = summaryDetails.cities.split(',');
                        if (cityDetail.length > 0 && cityDetail[0] !== "") {

                            vm.summaryDetails.cities.selectedOptions = vm.summaryDetails.cities.options.filter(function (city) {
                                return cityDetail.includes(city.DropdownID.toString());
                            })
                        }
                   }
                        else {
                            vm.summaryDetails.cities.selectedOptions = [];
                        }


                        MessageBoxSrvc.rssFeedCampaignSummaryDetail(vm.summaryDetails);
                    }

                });

            };
            vm.loadCampaigns(vm.limit, vm.skip());
            vm.deleteconfirmationMessage = function (confirmationMessage, id) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation-modal.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', 'MessageBoxSrvc', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message, MessageBoxSrvc) {
                        modalScope.confirmationMessage = message.mangeRSSPush.deleteRssConfirmation;
                        modalScope.del = true;
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.loadCampaigns(vm.limit, vm.skip());
                        };
                        modalScope.confirmNo = function () {
                            $uibModalInstance.close();
                        };
                        modalScope.confirmYes = function () {

                            campaignSrvc.deleteRSSFeedCampaign({ "id": id }).then(function (response) {
                                if (response.data.responseCode === 200) {
                                    modalScope.confirmationMessage = message.mangeRSSPush.rssPushDelete;
                                    modalScope.del = false;
                                }
                                else if (response.data.responseCode === 206) {
                                    $uibModalInstance.close();
                                    MessageBoxSrvc.warningMessageBox(message.mangeRSSPush.rssPushDeleteFailure);
                                }
                                else {
                                    $uibModalInstance.close();
                                    MessageBoxSrvc.warningMessageBox(message.error.internalError);
                                }
                            });;
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
                $state.go('iopush.auth.pushtorssEdit', { id: id });
            };
            vm.view = function (id, typeId) {
                $state.go('iopush.auth.newtabcampaignView', { id: id, step: 3 });
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
            vm.launchConfirmationMessage = function (confirmationMessage, id, status, statusCheck) {
                var active, activeValue;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/message.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message) {

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();

                        };
                        // if (status === 0) {
                        //     campaignSrvc.sendNotification({ "id": id }).then(function (response) {
                        //         if (response.data.responseCode === 200) {
                        //             vm.yes = true;
                        //             vm.loadCampaigns(vm.limit, vm.skip);
                        //             modalScope.confirmationMessage = { msg: confirmationMessage, css: successCss };
                        //         }
                        //         else {
                        //             //vm.messageBox("Failed to activate RSS");
                        //             modalScope.confirmationMessage = { msg: "Failed to activate RSS", css: failedCss };
                        //         }
                        //     });
                        // }

                        // else if (status === 2) {
                        if (statusCheck === 'active') {
                            active = 1;
                            activeValue = 1;
                        }
                        else if (statusCheck === 'inactive') {
                            active = 2;
                            activeValue = 0;
                        }
                        campaignSrvc.pauseRSSPUSH({ "id": id, "active": activeValue }).then(function (response) {
                            if (response.data.responseCode === 200) {

                                vm.loadCampaigns(vm.limit, vm.skip());
                                if (active === 1)
                                    modalScope.confirmationMessage = { msg: message.mangeRSSPush.rssActivate, css: successCss };
                                else if (active === 2)
                                    modalScope.confirmationMessage = { msg: message.mangeRSSPush.rssPaused, css: successCss };
                                // modalScope.confirmationMessage = { msg: confirmationMessage, css: successCss };
                            }
                            else if (response.data.responseCode === 206) {
                                if (active === 1)
                                    modalScope.confirmationMessage = { msg: message.mangeRSSPush.rssActivationFailure, css: failedCss };
                                else if (active === 2)
                                    modalScope.confirmationMessage = { msg: message.mangeRSSPush.rssPauseFailure, css: failedCss };
                                //vm.messageBox("Failed to pause");
                            }
                            else {
                                modalScope.confirmationMessage = message.error.internalError;
                            }
                        });

                        // }




                        // $timeout(function () {
                        //     $uibModalInstance.dismiss();
                        // }, 4000);
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

            // vm.actionConfirmationMessage = function (confirmationMessage, cssClass) {
            //     $uibModal.open({
            //         animation: true,
            //         templateUrl: 'app/shared/templates/message.html',
            //         controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage) {

            //             modalScope.closeModal = function () {
            //                 $uibModalInstance.dismiss();

            //             };
            //             modalScope.confirmationMessage = { msg: confirmationMessage, css: cssClass };


            //             // $timeout(function () {
            //             //     $uibModalInstance.dismiss();

            //             // }, 5000);

            //         }
            //         ],
            //         backdrop: 'static',
            //         size: 'md',
            //         resolve: {
            //             confirmationMessage: function () {
            //                 return confirmationMessage;
            //             }
            //         }
            //     });
            // };



        }],
        controllerAs: 'vm'
    });
})();