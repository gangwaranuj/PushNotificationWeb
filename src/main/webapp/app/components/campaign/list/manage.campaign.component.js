(function () {
    var app = angular.module('app');
    app.component('campaign', {
        bindings: {},
        templateUrl: 'app/components/campaign/list/manage.campaign.html',
        controller: ['$scope', 'campaignSrvc', '$uibModal', '$state', '$cookies', 'MessageBoxSrvc', 'masterSrvc', 'message', 'utilitySrvc', function ($scope, campaignSrvc, $uibModal, $state, $cookies, MessageBoxSrvc, masterSrvc, message,utilitySrvc) {
            var vm = this;
            var segmentDetail;
            vm.limit = 15;
            vm.maxSize = 1;
            vm.currentPage = 1;
            vm.skip =function(){ return (vm.currentPage - 1) * vm.limit;};
            vm.count = 0;
            vm.live = true;
            vm.pending = true;
            vm.expired = true;
            vm.draft = true;
            vm.campaignName = "";
            vm.summaryDetails = {};
            vm.columnForOrdering = 'campaignId';
            vm.requiredOrder = 'desc'
            vm.sortOrder = false;
            vm.colNameArray = ['campaignId', 'campaignName', 'campaignStatus', 'campaignScheduleDate', 'modificationDate','platform'];
            vm.summaryDetails = {
                targetGroup: "",
                platform: {
                    selectedOptions: [],
                    options: [
                    ]

                },
                campaign_name: "",
                campaign_schedule_date: "",
                campaign_end_date: "",
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
            vm.search = function () {
                vm.loadCampaigns(vm.limit, vm.skip());
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
                        vm.loadCampaigns(vm.limit, vm.skip());
                    }
                    else {
                        $('#' + vm.colNameArray[i]).addClass('iosortsearch');
                        $('#' + vm.colNameArray[i]).removeClass('iosortup');
                        $('#' + vm.colNameArray[i]).removeClass('iosortdown');
                    }
                }
            }
            vm.loadCampaigns = function (limit, pageIndex) {
                var filter = {
                    pending: vm.pending ? 1 : 0,
                    expired: vm.expired ? 1 : 0,
                    draft: vm.draft ? 1 : 0,
                    live: vm.live ? 1 : 0,
                    startIndex: pageIndex,
                    pageSize: limit,
                    campaign_name: vm.campaignName,
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

                campaignSrvc.getCampaigns(filter).then(function (response) {
                    data = response.data;
                    // console.log(data);
                    if (response.data.Result === "Success") {
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
                            if (item.campaign_status === 1) {
                                item.view = true;
                                item.edit = false;
                                item.del = false;
                                item.launch = false;
                                item.status = "Live";
                                item.cssClass = "status-btn status-live";
                            }
                            else if (item.campaign_status === 3) {
                                item.view = true;
                                item.edit = false;
                                item.del = false;
                                item.launch = false;
                                item.status = "Expired";
                                item.cssClass = "status-btn status-expired";
                            }
                            else if (item.campaign_status === 2) {
                                item.view = false;
                                item.edit = true;
                                item.del = true;
                                item.launch = true;
                                item.status = "Pending";
                                item.cssClass = "status-btn status-draft";
                            }
                            else if (item.campaign_status === 4) {
                                item.view = false;
                                item.edit = true;
                                item.del = true;
                                item.launch = true;
                                item.status = "Draft";
                                item.cssClass = "status-btn status-pending";
                            }


                            if(vm.columnForOrdering!=='platform'){
                            if (!item.isSegmented) {
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


            vm.viewSummary = function (id) {
                campaignSrvc.getCampaignById({ campaign_id: id }).then(function (response) {
                    if (response.data.Result === "Success") {
                        //console.log("response.data.Result",response.data);
                        var summaryDetails = response.data.Record;
                        if (summaryDetails.isSegmented == true)
                            vm.summaryDetails.targetGroup = 'Segmented';
                        else if (summaryDetails.isSegmented == false)
                            vm.summaryDetails.targetGroup = 'ALL SUBSCRIBERS';
                        vm.summaryDetails.campaign_name = summaryDetails.campaign_name;
                        vm.summaryDetails.campaign_schedule_date = summaryDetails.campaign_schedule_date;
                        vm.summaryDetails.campaign_end_date = summaryDetails.campaign_end_date;
                        vm.summaryDetails.subscribed = summaryDetails.subscribed;
                        vm.summaryDetails.eligiblecount = summaryDetails.eligiblecount;
                        vm.summaryDetails.title = summaryDetails.title;
                        vm.summaryDetails.description = summaryDetails.description;
                        vm.summaryDetails.forwardUrl = summaryDetails.forwardUrl;
                        vm.summaryDetails.imagePath = summaryDetails.imagePath;



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
                            if (segmentTypes.length > 0 && segmentTypes[0] !== "") {
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
                            if (segmentDetail.length > 0 && segmentDetail[0] !== "") {
                                vm.summaryDetails.segments.selectedOptions = vm.summaryDetails.segments.options.filter(function (segment) {
                                    return segmentDetail.includes(segment.Value.toString());
                                })
                            }
                        }
                        else {
                            vm.summaryDetails.segments.selectedOptions = [];
                        }

                        isps = summaryDetails.isps.split(',');
                        if (isps.length > 0 && isps[0] !== "") {

                            vm.summaryDetails.internetProviders.selectedOptions = vm.summaryDetails.internetProviders.options.filter(function (ISP) {
                                return isps.includes(ISP.Value.toString());
                            })
                        }
                        else {
                            vm.summaryDetails.internetProviders.selectedOptions = [];
                        }

                        cityDetail = summaryDetails.cities.split(',');
                        if (cityDetail.length > 0 && cityDetail[0] !== "") {

                            vm.summaryDetails.cities.selectedOptions = vm.summaryDetails.cities.options.filter(function (city) {
                                return cityDetail.includes(city.DropdownID.toString());
                            })
                        }
                        else {
                            vm.summaryDetails.cities.selectedOptions = [];
                        }
                        MessageBoxSrvc.campaignSummaryDetail(vm.summaryDetails);
                        //console.log("vm.summaryDetails",vm.summaryDetails);
                    }

                });

            };
            vm.loadCampaigns(vm.limit, vm.skip());
            vm.deleteconfirmationMessage = function (confirmationMessage, id, campaignTypeId) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation-modal.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', 'MessageBoxSrvc', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message, MessageBoxSrvc) {
                        modalScope.confirmationMessage = message.mangeCampaign.deleteCampaignConfirmation;
                        modalScope.del = true;
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.loadCampaigns(vm.limit, vm.skip());
                        };
                        modalScope.confirmNo = function () {
                            $uibModalInstance.close();
                        };
                        modalScope.confirmYes = function () {
                            modalScope.del = false;
                            campaignSrvc.deleteCampaign({ "campaign_id": id }).then(function (response) {
                                if (response.data.Result === "Success") {
                                    modalScope.confirmationMessage = message.mangeCampaign.deleteCampaign;
                                }
                                else {
                                    $uibModalInstance.close();
                                    MessageBoxSrvc.warningMessageBox(message.mangeCampaign.deleteCampaignFailure);
                                }
                            });
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
                $state.go('iopush.auth.notificationcampaignEdit', { id: id });
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

            vm.launchConfirmationMessage = function (confirmationMessage, id, campaignstartdate, campaignenddate, timeZone, status) {

                var currentDateTime = new Date(moment.tz(timeZone).format('YYYY-MM-DD HH:mm:ss'));//new Date()
                currentDateTime.setMinutes(currentDateTime.getMinutes() + 15);


                if (status === 4 && (campaignstartdate === "" || campaignenddate === "")) {

                    MessageBoxSrvc.warningMessageBox(message.mangeCampaign.draftCampaignLaunching);
                }

                else if (((new Date(campaignstartdate)) > currentDateTime) && (status === 2)) {
                    MessageBoxSrvc.successMessageBox(message.mangeCampaign.notification + utilitySrvc.getDate(campaignstartdate) + '.');

                }
                else if (((new Date(campaignstartdate)) > currentDateTime) && (status === 4)) {
                    campaignSrvc.changecampaignStatus({ "campaign_id": id }).then(function (response) {
                        if (response.data.responseCode === 200) {
                            vm.loadCampaigns(vm.limit, vm.skip());
                            MessageBoxSrvc.successMessageBox(message.mangeCampaign.notification + utilitySrvc.getDate(campaignstartdate) + '.');

                        }
                        else if (response.data.responseCode === 206) {
                            MessageBoxSrvc.warningMessageBox(message.mangeCampaign.campaignLaunchedFailureMessage);

                        }
                        else {
                            MessageBoxSrvc.warningMessageBox(message.error.internalError);

                        }
                    });
                }
                else if ((new Date(campaignenddate)) <= (currentDateTime)) {

                    campaignSrvc.expirecampaign({ "campaign_id": id }).then(function (response) {
                        if (response.data.responseCode == 200) {

                            vm.loadCampaigns(vm.limit, vm.skip());
                          

                            MessageBoxSrvc.successMessageBox(message.mangeCampaign.campaignExpireMessage);

                        }
                        else if (response.data.responseCode === 206) {
                            MessageBoxSrvc.warningMessageBox(message.mangeCampaign.campaignExpireFailureMessage);

                        }
                        else {
                            MessageBoxSrvc.warningMessageBox(message.error.internalError);

                        }
                    });
                }
                else {
                    campaignSrvc.launchCampaign({ "campaign_id": id }).then(function (response) {
                        if (response.data.responseCode == 200) {

                         
                            vm.loadCampaigns(vm.limit, vm.skip());

                            MessageBoxSrvc.successMessageBox(message.mangeCampaign.campaignLaunchedMessage);

                        }
                        else if (response.data.responseCode === 206) {

                            MessageBoxSrvc.warningMessageBox(message.mangeCampaign.campaignLaunchedFailureMessage);

                        }
                        else {
                            MessageBoxSrvc.warningMessageBox(message.error.internalError);

                        }
                    });
                }

            };


        }],
        controllerAs: 'vm'
    });
})();