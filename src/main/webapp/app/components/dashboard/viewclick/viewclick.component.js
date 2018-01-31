(function () {
    var app = angular.module('app');
    app.component('viewClick', {
        bindings: {
        },
        templateUrl: 'app/components/dashboard/viewclick/viewclick.html',
        controller: ['viewsSrvc', '$scope', 'MessageBoxSrvc', function (viewsSrvc, $scope, MessageBoxSrvc) {
            var vm = this;
            vm.xAxisDate = [];
            vm.yAxisViews = [];
            vm.yAxisClicks = [];
            var clickedOnOneDAy = 0;
            var clickedOnCalender = 0;
            var clickedOnOneWeek = 0;
            var today = new Date();
            var day = today.getDate();
            var mo = today.getMonth() + 1;
            var y = today.getFullYear();
            var current = y + '-' + mo + '-' + day;
            var initialDate = current;
            var finalDate = current;
            var startDate = current;
            var endDate = current;
            vm.chartType = 'day';
            vm.nextbtnid = 'vcnext';
            vm.prevbtnid = 'vcprev';
            var day_week_date = 0;
            vm.callOut = Highcharts.Renderer.prototype.symbols.callout;
            function setChartConfig(response, flag, grayIndex, blueIndex) {
                var grayChardIndex = grayIndex;
                var blueChardIndex = blueIndex;
                vm.xAxisDate = [];
                vm.yAxisViews = [];
                vm.yAxisClicks = [];
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var datee = [];
                var forDay = false;
                response.Records
                    .map(function (
                        record) {
                        if (flag == 1) {
                            if (response.TotalRecordCount == 1) {
                                datee = monthNames[new Date(current).getMonth()] + ' ' + new Date(current).getDate();
                            }
                            else {
                                forDay = true;
                                datee = Number(record.date);
                            }
                        }
                        else {
                            datee = monthNames[new Date(record.date).getMonth()] + ' ' + new Date(record.date).getDate();
                        }
                        vm.xAxisDate.push(datee);
                        vm.yAxisViews.push(record.viewHits);
                        vm.yAxisClicks.push(record.clickHits);
                    });
                var maxLimit = 0;
                for (var i = 0; i < vm.yAxisClicks.length; i++) {
                    if (vm.yAxisClicks[i] > maxLimit) {
                        maxLimit = vm.yAxisClicks[i];
                    }
                }
                for (var i = 0; i < vm.yAxisViews.length; i++) {
                    if (vm.yAxisViews[i] > maxLimit) {
                        maxLimit = vm.yAxisViews[i];
                    }
                }
                $scope.chartConfig = {
                    chart: {
                        type: 'area',
                        events: {
                            load: function () {
                                // var ren = this.renderer;
                                // var el = ren.image('images/icons/chart-left-arrow.png', 0, this.renderer.height - 50, 10, 10).add();
                                // el.element.id = vm.prevbtnid;
                                // var el2 = ren.image('images/icons/chart-right-arrow.png', this.renderer.width, this.renderer.height - 50, 10, 10).add();
                                // el2.element.id = vm.nextbtnid;
                            }
                        }
                    },
                    title: {
                        text: '',
                    },
                    subtitle: {
                        text: '',
                    },
                    xAxis: {
                        type: 'Number',
                        tickInterval: 1,
                        gridLineColor: '#f4f4f4',
                        labels: {
                            style: {
                                fontSize: '0.9em',
                                'height': '30px',
                                fontFamily: 'Lato'
                            },
                            useHTML: true,
                            formatter: function () {
                                if (forDay)
                                    return vm.xAxisDate[this.value] + ':00';
                                else
                                    return vm.xAxisDate[this.value]
                            }
                        },
                        tickPositioner: function () {
                            //console.log(vm.xAxisDate);
                            if (forDay) {
                                var result = [];
                                for (i = 0; i < vm.xAxisDate.length; i++)
                                    result.push(vm.xAxisDate[i]);
                                return result;
                            }
                        }
                    },
                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        max: maxLimit + 5,
                        gridLineColor: '#f4f4f4',
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        area: {
                            marker: {
                                enabled: true,
                                symbol: 'circle',
                                radius: 1,
                                fillColor: "transparent",  //this.color,
                                states: {
                                    hover: {
                                        enabled: true,
                                        fillColor: 'white',
                                        lineColor: '#39bfd7',
                                        lineWidth: 1
                                    }
                                }
                            },
                        }
                    },
                    tooltip: {
                        crosshairs: [{
                            width: 1,
                            dashStyle: 'dot',
                            color: '#D8D8D8'
                        }, false],
                        borderWidth: 0,
                        formatter: function () {
                            this.series.chart.renderer.symbols.callout = vm.callOut;
                            if (this.series.tooltipOptions.pointFormat.indexOf("Clicked") == -1) {
                                return this.y + " Delivered<br/>"
                            }
                            return this.y + " Clicked<br/>"
                        }
                    },
                    series: [{
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#d7d7d7'],
                                [1, '#d7d7d7']
                            ]
                        },
                        tooltip: {
                            crosshairs: [true, true],
                            headerFormat: '',
                            pointFormat: '<b>{point.y}</b> Delivered<br/>'
                        },
                        showInLegend: false,
                        type: 'area',
                        data: vm.yAxisViews,
                        index: blueChardIndex,
                        lineColor: "#d7d7d7"
                    },
                    {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#2ec16e'],
                                [1, '#2ec16e']
                            ]
                        },
                        tooltip: {
                            crosshairs: [true, true],
                            headerFormat: '',
                            pointFormat: '<b>{point.y}</b> Clicked<br/>',
                        },
                        showInLegend: false,
                        type: 'area',
                        data: vm.yAxisClicks,
                        index: grayChardIndex,
                        lineColor: "#2ec16e"
                    }]
                };
            }
            viewsSrvc.oneDayviewsclick(current).then(
                function (response) {
                    if (response.Result == "Success") {
                        clickedOnOneDAy = 1;
                        clickedOnCalender = 0;
                        clickedOnOneWeek = 0;
                        day_week_date = 1;
                        initialDate = moment().subtract(0, 'days');
                        finalDate = moment();
                        setChartConfig(response, 1);
                    } else {
                        console.log("some error text");
                    }
                });
            vm.onSelectGraph = function (indexGray, indexBlue, clickViewStatus) {
                if (clickViewStatus === "day") {
                    vm.oneDay('active', indexGray, indexBlue);
                } else if (clickViewStatus === "week") {
                    vm.oneWeek('active', indexGray, indexBlue);
                } else {
                    vm.calendarData(indexGray, indexBlue);
                }
            }
            vm.oneDay = function (activeTab, indexGray, indexBlue) {
                vm.dateRange();
                $('#calView').removeClass("io-calender");
                viewsSrvc.oneDayviewsclick(current).then(
                    function (response) {
                        if (response.Result == "Success") {
                            vm.chartType = 'day';
                            clickedOnOneDAy = 1;
                            clickedOnCalender = 0;
                            clickedOnOneWeek = 0;
                            day_week_date = 1;
                            initialDate = moment().subtract(0, 'days');
                            finalDate = moment();
                            setChartConfig(response, 1, indexGray, indexBlue);
                        } else {
                            console.log("some error text");
                        }
                    });
            }
            vm.oneWeek = function (activeTab, indexGray, indexBlue) {
                vm.dateRange();
                $('#calView').removeClass("io-calender");
                viewsSrvc
                    .oneWeekviewsclick()
                    .then(
                    function (response) {
                        if (response.Result == "Success") {
                            vm.chartType = 'week';
                            dps = [];
                            dps1 = [];
                            clickedOnOneDAy = 0;
                            clickedOnCalender = 0;
                            clickedOnOneWeek = 1;
                            day_week_date = 2;
                            initialDate = moment()
                                .subtract(6,
                                'days');
                            finalDate = moment()
                                .subtract(0,
                                'days');
                            setChartConfig(response, 0, indexGray, indexBlue);
                        } else {
                            console.log("some error text");
                        }
                    });
            }
            var getDate = [];
            vm.calendarData = function (indexGray, indexBlue) {
                if (getDate[0] === getDate[1]) {
                    MessageBoxSrvc.warningMessageBox('Please select date range.');
                    return;
                }
                viewsSrvc.calendarviewsclick(getDate[0], getDate[1]).then(function (response) {
                    if (response.Result == "Success") {
                        dps = [];
                        dps1 = [];
                        clickedOnOneDAy = 0;
                        clickedOnCalender = 1;
                        clickedOnOneWeek = 0;
                        day_week_date = 3;
                        initialDate = getDate[0];
                        finalDate = getDate[1];
                        vm.chartType = 'cal';
                        setChartConfig(response, 0, indexGray, indexBlue);
                    } else {
                        console.log("some error text");
                    }
                });
            }
            vm.commonFunction = function (initialDate, finalDate) {
                viewsSrvc.calendarviewsclick(initialDate, finalDate).then(
                    function (response) {
                        if (response.Result == "Success") {
                            setChartConfig(response);
                        } else {
                            console.log("some error text");
                        }
                    });
            }
            vm.dayButtonFunction = function (initial) {
                viewsSrvc.oneDayviewsclick(initial).then(function (response) {
                    if (response.Result == "Success") {
                        setChartConfig(response, 1);
                    } else {
                        console.log("some error text");
                    }
                });
            }
            vm.previous = function () {
                if (clickedOnOneDAy == 1) {
                    finalDate = new Date(initialDate);
                    initialDate = new Date(initialDate);
                    initialDate.setDate(initialDate.getDate() - 1);
                    finalDate = formatDate(finalDate);
                    initialDate = formatDate(initialDate);
                    vm.dayButtonFunction(initialDate);

                } else if ((clickedOnOneWeek == 1) || (clickedOnCalender == 1)) {
                    initialDate = new Date(initialDate);
                    finalDate = new Date(finalDate);
                    initialDate.setDate(initialDate.getDate() - 1);
                    finalDate.setDate(finalDate.getDate() - 1);
                    finalDate = formatDate(finalDate);
                    initialDate = formatDate(initialDate);
                    vm.commonFunction(initialDate, finalDate);
                }
            }


            // for next button
            vm.next = function () {
                finalDate = new Date(finalDate);
                var current = new Date();
                //current.setDate(current.getDate() - 1);
                current.setDate(current.getDate() - 0);
                // Date().getTime());
                var fdate = formatDate(finalDate);
                var iDate = formatDate(initialDate);
                var cDate = formatDate(current);



                //if (finalDate.getTime() < current.getTime()) {

                //if (fdate !== cDate) {
                if (new Date(iDate) < new Date(fdate)) {
                    if (clickedOnOneDAy == 1) {
                        initialDate = new Date(finalDate);
                        finalDate = new Date(finalDate);

                        // if(cDate !== fdate  )							
                        // finalDate.setDate(finalDate.getDate() + 1);

                        var day = initialDate.getDate();

                        var monthIndex = initialDate.getMonth() + 1;
                        var year = initialDate.getFullYear();
                        var initial = year + '-' + monthIndex
                            + '-' + day;
                        day = finalDate.getDate();
                        monthIndex = finalDate.getMonth() + 1;
                        year = finalDate.getFullYear();
                        var final = year + '-' + monthIndex
                            + '-' + day;
                        finalDate = final;
                        initialDate = initial;
                        vm.dayButtonFunction(final);
                        if (cDate !== fdate) {
                            finalDate = new Date(finalDate);
                            finalDate.setDate(finalDate.getDate() + 1);
                            var a = formatDate(finalDate);
                            //console.log(finalDate);
                        }


                    } else if (clickedOnOneWeek == 1) {
                        if (cDate === fdate) {
                            return;
                        }

                        initialDate = new Date(initialDate);
                        finalDate = new Date(finalDate);
                        initialDate.setDate(initialDate
                            .getDate() + 1);
                        finalDate
                            .setDate(finalDate.getDate() + 1);
                        var day = initialDate.getDate();
                        day = day.toString().length < 2 ? '0' + day.toString() : day.toString();
                        var monthIndex = initialDate.getMonth() + 1;
                        monthIndex = monthIndex.toString().length < 2 ? '0' + monthIndex.toString() : monthIndex.toString();
                        var year = initialDate.getFullYear();
                        var initial = year + '-' + monthIndex
                            + '-' + day;
                        day = finalDate.getDate();
                        day = day.toString().length < 2 ? '0' + day.toString() : day.toString();
                        monthIndex = finalDate.getMonth() + 1;
                        monthIndex = monthIndex.toString().length < 2 ? '0' + monthIndex.toString() : monthIndex.toString();
                        year = finalDate.getFullYear();
                        var final = year + '-' + monthIndex
                            + '-' + day;
                        finalDate = final;
                        initialDate = initial;
                        vm.commonFunction(initial, final);
                    } else if (clickedOnCalender == 1) {

                        if (cDate === fdate) {
                            return;
                        }

                        initialDate = new Date(initialDate);
                        finalDate = new Date(finalDate);

                        initialDate.setDate(initialDate
                            .getDate() + 1);
                        finalDate
                            .setDate(finalDate.getDate() + 1);
                        var day = initialDate.getDate();
                        day = day.toString().length < 2 ? '0' + day.toString() : day.toString();
                        var monthIndex = initialDate.getMonth() + 1;
                        monthIndex = monthIndex.toString().length < 2 ? '0' + monthIndex.toString() : monthIndex.toString();
                        var year = initialDate.getFullYear();
                        var initial = year + '-' + monthIndex
                            + '-' + day;
                        day = finalDate.getDate();
                        day = day.toString().length < 2 ? '0' + day.toString() : day.toString();
                        monthIndex = finalDate.getMonth() + 1;
                        monthIndex = monthIndex.toString().length < 2 ? '0' + monthIndex.toString() : monthIndex.toString();
                        year = finalDate.getFullYear();
                        var final = year + '-' + monthIndex
                            + '-' + day;
                        finalDate = final;
                        initialDate = initial;
                        vm.commonFunction(initial, final);
                    }
                }
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

            vm.dateRange = function () {
                $('#calView').daterangepicker(
                    {
                        locale: {
                            format: 'YYYY-MM-DD'
                        },
                        startDate: moment().subtract('days',
                            29),
                        endDate: moment(),
                        maxDate: moment(),
                        opens: 'left',
                        autoApply: true
                    },
                    function (start, end) {
                        getDate = [];
                        getDate.push(start.format('YYYY-MM-DD')
                            .toString());
                        getDate.push(end.format('YYYY-MM-DD')
                            .toString());
                        vm.calendarData();
                    });
            };
            vm.dateRange();
        }],
        controllerAs: 'vm'
    });
})();