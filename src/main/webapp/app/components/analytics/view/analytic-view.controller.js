
(function () {
    var app = angular.module('app');
    app.controller('analyticViewController', ['$scope', 'campaignAnalyticSrvc', '$uibModal', '$state', '$cookies', 'utilitySrvc', function ($scope, campaignAnalyticSrvc, $uibModal, $state, $cookies, utilitySrvc) {

        var vm = this;
        vm.limit = 10;
        vm.maxSize = 1;
        vm.currentPage = 1;
        vm.skip = (vm.currentPage - 1) * vm.limit;
        vm.count = 0;
        vm.live = true;
        vm.pending = true;
        vm.expired = true;
        vm.draft = true;
        vm.campaignName = "";
        var getDate = [];
        vm.columnForOrdering = 'campaignId';
        vm.requiredOrder = 'desc'
        vm.sortOrder = false;
        vm.colNameArray = ['creationDate', 'campaignId', 'campaignName', 'campaignStatus', 'campaignsent', 'campaignopen', 'campaignclick'];
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
                    vm.loadCampaigns(vm.limit, vm.skip);
                }
                else {
                    $('#' + vm.colNameArray[i]).addClass('iosortsearch');
                    $('#' + vm.colNameArray[i]).removeClass('iosortup');
                    $('#' + vm.colNameArray[i]).removeClass('iosortdown');
                }
            }
        }
        vm.search = function () {
            vm.loadCampaigns(vm.limit, vm.skip);
        };

        vm.loadCampaigns = function (limit, pageIndex) {
            var filter = {
                // pending: vm.pending ? 1 : 0,
                // expired: vm.expired ? 1 : 0,
                // draft: vm.draft ? 1 : 0,
                // live: vm.live ? 1 : 0,
                startIndex: pageIndex,
                pageSize: limit,
                campaign_name: vm.campaignName,
                columnForOrdering: vm.columnForOrdering,
                requiredOrder: vm.requiredOrder


            };

            if (getDate.length > 0) {
                filter.campaign_schedule_date = getDate[0];//utilitySrvc.getDateFormat(getDate[0]);
                filter.campaign_end_date = getDate[1];//utilitySrvc.getDateFormat(getDate[1]);
            }




            var data;
            campaignAnalyticSrvc.getCampaignsAnalytics(filter).then(function (response) {

                data = response.data;


                if (response.data.Result === "Success") {
                    vm.campaigns = response.data.Records;
                    vm.count = response.data.TotalRecordCount;

                    //Set fields of paging attribute
                    vm.handler = {
                        currentPage: vm.currentPage,
                        maxSize: vm.maxSize,
                        totalCount: Number(vm.count),
                        limit: vm.limit,
                        totalpages: vm.count === 0 ? 1 : parseInt(((Number(vm.count) - 1) / vm.limit) + 1)
                    }

                    // Callback pagination
                    vm.onAction = function (currentpage, limit, skip) {
                        vm.currentPage = currentpage;
                        vm.loadCampaigns(limit, skip);
                    }

                    if (vm.campaigns) {
                        vm.campaigns = vm.campaigns.map(function (item) {

                            if (item.campaign_status === 1) {

                                item.status = "Live";
                                item.cssClass = "status-btn status-live";
                            }
                            else if (item.campaign_status === 3) {

                                item.status = "Expired";
                                item.cssClass = "status-btn status-expired";
                            }
                            else if (item.campaign_status === 2) {

                                item.status = "Pending";
                                item.cssClass = "status-btn status-draft";
                            }
                            else if (item.campaign_status === 4) {

                                item.status = "Draft";
                                item.cssClass = "status-btn status-pending";
                            }

                            if (item.open === 0) {
                                item.conversionRate = 0.00;
                            }
                            else {
                                item.conversionRate = ((item.click / item.open) * 100).toFixed(2);
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
        vm.loadCampaigns(vm.limit, vm.skip);

        vm.drill = function (id, campaignTypeId) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/analytics/view/analytic-view-drill.html',
                controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'campaignAnalyticSrvc', function (modalScope, $uibModalInstance, $state, $timeout, campaignAnalyticSrvc) {
                    // modalScope.confirmationMessage = confirmationMessage;
                    //modalScope.del = true;


                    modalScope.closeModal = function () {
                        $uibModalInstance.dismiss();
                    };
                    modalScope.showRows = [];
                    modalScope.checkShowRows = function (val) {

                        return modalScope.showRows.indexOf(val) != -1
                    }

                    modalScope.tableRowExpanded = false;
                    modalScope.tableRowIndexCurrExpanded = "";
                    modalScope.tableRowIndexPrevExpanded = "";
                    modalScope.storeIdExpanded = "";
                    modalScope.cityDataCollapse = [true, true, true, true, true, true];

                    campaignAnalyticSrvc.getCampaignAnalyticById({ campaign_id: id }).then(function (response) {
                        if (response.data.Result == "Success") {
                            modalScope.campaignsDataModel = response.data.Records;

                        }

                    }, function (response) {
                    });



                    modalScope.cityDataCollapseFn = function () {
                        for (var i = 0; modalScope.campaignsDataModel.cityStat.length - 1; i++) {
                            modalScope.cityDataCollapse.append('true');
                        }
                    };

                    modalScope.countryDataSelectFn = function () {
                        modalScope.campaignsDataModel.forEach(function (element) {
                            document.getElementById(element.countryId).style.backgroundColor = '#fff';
                        });
                    };
                    modalScope.countryDataInActiveFn = function () {
                        modalScope.campaignsDataModel.forEach(function (element) {
                            //  if(document.getElementById(element.countyName).className ){
                            document.getElementById(element.countryName).className = "abc";
                            // }
                        });
                    };

                    modalScope.selectTableRow = function (index, countryId, countryName) {



                        if (modalScope.showRows.indexOf(index) > -1) {
                            modalScope.showRows = modalScope.showRows.filter(function (item) {
                                return item != index;
                            });
                        }
                        else {
                            modalScope.showRows = [];
                            modalScope.showRows.push(index);
                        }

                        if (modalScope.cityDataCollapse === 'undefined') {
                            modalScope.cityDataCollapse = modalScope.cityDataCollapseFn();
                        } else {
                            modalScope.countryDataSelectFn();
                            modalScope.countryDataInActiveFn();
                            if (modalScope.tableRowExpanded === false && modalScope.tableRowIndexCurrExpanded === "" && modalScope.storeIdExpanded === "") {
                                modalScope.tableRowIndexPrevExpanded = "";
                                modalScope.tableRowExpanded = true;
                                modalScope.tableRowIndexCurrExpanded = index;
                                modalScope.storeIdExpanded = countryId;
                                document.getElementById(countryId).style.backgroundColor = '#f9fafb';
                                document.getElementById(countryName).className = "selected-row";
                                modalScope.cityDataCollapse[index] = false;
                            } else if (modalScope.tableRowExpanded === true) {
                                if (modalScope.tableRowIndexCurrExpanded === index && modalScope.storeIdExpanded === countryId) {
                                    modalScope.tableRowExpanded = false;
                                    modalScope.tableRowIndexCurrExpanded = "";
                                    modalScope.storeIdExpanded = "";
                                    modalScope.cityDataCollapse[index] = true;
                                    document.getElementById(countryId).style.backgroundColor = '#fff';
                                    document.getElementById(countryName).className = "";
                                } else {
                                    modalScope.tableRowIndexPrevExpanded = modalScope.tableRowIndexCurrExpanded;
                                    modalScope.tableRowIndexCurrExpanded = index;
                                    modalScope.storeIdExpanded = countryId;
                                    modalScope.cityDataCollapse[modalScope.tableRowIndexPrevExpanded] = true;
                                    modalScope.cityDataCollapse[modalScope.tableRowIndexCurrExpanded] = false;
                                    document.getElementById(countryId).style.backgroundColor = '#f9fafb';
                                    document.getElementById(countryName).className = "selected-row";
                                }
                            }
                        }
                    };




                }
                ]
                //,
                // backdrop: 'static',
                // size: 'md',
                // resolve: {
                //     // confirmationMessage: function () {
                //     //     return confirmationMessage;
                //     // }
                // }
            });
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

        $('#calView').daterangepicker(
            {
                locale: {
                    format: 'YYYY-MM-DD'
                },
                startDate: moment().subtract('days',
                    29),
                endDate: moment(),
                maxDate: moment().subtract(0, 'days'),
                opens: 'left',
                autoApply: true

            },
            function (start, end) {
                getDate = [];
                getDate.push(start.format('YYYY-MM-DD')
                    .toString());
                getDate.push(end.format('YYYY-MM-DD')
                    .toString());
                // vm.calendarData();
                vm.search();
            });




    }]);
})();