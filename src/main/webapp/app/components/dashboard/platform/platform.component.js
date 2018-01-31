(function () {
	var app = angular.module('app');
	app.component('platform', {
		bindings: {
		},
		templateUrl: 'app/components/dashboard/platform/platform.html',
		controller: ['platformSrvc', '$timeout', '$scope', '$uibModal', 'MessageBoxSrvc', 'platformDetail', function (platformSrvc, $timeout, $scope, $uibModal, MessageBoxSrvc, platformDetail) {

			var vm = this;
			vm.platformType = 'snapshot';
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
			vm.nextbtnid = 'ptnext';
			vm.prevbtnid = 'ptprev';
			vm.platformDetail = platformDetail;
			var day_week_date = 0;
			vm.callOut = Highcharts.Renderer.prototype.symbols.callout;

			function Capitalize(text) {
				return text[0].toUpperCase() + text.slice(1);
			}
			vm.platforms = [
				{
					"platformName": "Android", "platformImg": "images/icons/android.png", "totalusers": 0
				},
				{
					"platformName": "Chrome", "platformImg": "images/icons/Chrome.png", "totalusers": 0,
				},
				{
					"platformName": "Firefox", "platformImg": "images/icons/Firefox.png", "totalusers": 0,
				},
				{
					"platformName": "Opera", "platformImg": "images/icons/Opera.png", "totalusers": 0,
				}
				// {
				// 	"platformName": "Safari", "platformImg": "images/icons/safari-icon.png", "totalusers": 0,
				// }
			];

			vm.totalPlatformUsers = 0;
			var trendRecords = [];
			platformSrvc.getTrendData().then(function (data) {
				if (data.Records) {
					data.Records.forEach(function (item) {
						if (vm.platformDetail[item.platformName.toLowerCase()]) {
							trendRecords.push({ 'name': Capitalize(item.platformName.toLowerCase()), 'y': item.count, 'color': vm.platformDetail[item.platformName.toLowerCase()].color });
							var platDt = vm.platforms.filter(pform => pform.platformName.toLowerCase() === item.platformName.toLowerCase());
							if (platDt) {
								platDt[0].totalusers = item.count;
								vm.totalPlatformUsers += item.count;
							}
						}
					});
					vm.trendConfigObj.series[0].data = trendRecords;
					vm.trendConfigObj.processWhenChange();
				}
			});




			vm.settrendConfigObject = function () {

				vm.trendConfigObj = {
					chart: {
						events: {
							load: function () {
							}
						},
						backgroundColor: 'transparent',
					},

					tooltip: {
						enabled: true,
						borderColor: '#dcdcdc',
						backgroundColor: '#ffffff',
						formatter: function () {
							this.series.chart.renderer.symbols.callout = function (x, y, w, h, options) {
								var arrowLength = 6,
									halfDistance = 6,
									r = Math.min((options && options.r) || 0, w, h),
									safeDistance = r + halfDistance,
									anchorX = options && options.anchorX,
									anchorY = options && options.anchorY,
									path;

								path = [
									'M', x + r, y,
									'L', x + w - r, y, // top side
									'C', x + w, y, x + w, y, x + w, y + r, // top-right corner
									'L', x + w, y + h - r, // right side
									'C', x + w, y + h, x + w, y + h, x + w - r, y + h, // bottom-right corner
									'L', x + r, y + h, // bottom side
									'C', x, y + h, x, y + h, x, y + h - r, // bottom-left corner
									'L', x, y + r, // left side
									'C', x, y, x, y, x + r, y // top-right corner
								];

								path.splice(23, 3,
									'L', w / 2 + halfDistance, y + h,
									w / 2, y + h + arrowLength,
									w / 2 - halfDistance, y + h,
									x + r, y + h
								);

								return path;
							};
							return this.key + " " + Math.floor(this.percentage) + "%";
						}

					},


					plotOptions: {
						pie: {
							dataLabels: {
								enabled: false,
								style: {
									fontWeight: 'bold',
									color: 'white'
								}
							},
							startAngle: -180,
							endAngle: 180,

						},
						series: {
							states: {
								hover: {
									enabled: false
								}
							},
						}

					},
					series: [{
						type: 'pie',
						name: 'Browser share',
						innerSize: '75%',
						data: [],
					}]
				};

			}
			vm.settrendConfigObject();
			vm.setPlatformType = function (option) {
				vm.platformType = option;
				vm.chartType = 'day';
				if (option != 'snapshot') {
					var today2 = new Date();
					var day2 = today2.getDate();
					var mo2 = today2.getMonth() + 1;
					var y2 = today2.getFullYear();
					var current2 = y2 + '-' + mo2 + '-' + day2;
					vm.dayButtonFunction(current2);
					clickedOnOneDAy = 1;
					clickedOnCalender = 0;
					clickedOnOneWeek = 0;
					day_week_date = 1;
					initialDate = moment().subtract(0, 'days');
					finalDate = moment();
					vm.dateRange();

				}
			}
			function sortNumber(a, b) {
				return a - b;
			}
			function getMatchingSeriesValues(param, listObj) {
				var list = {};
				for (var key in listObj) {
					if (listObj[key] == listObj[param]) {
						//list.push(listObj[key]);
						list[key] = listObj[key];
					}
				}
				return list;
			}
			function setChartConfig(response, flag, grayIndex, blueIndex) {
				var recordData = { "android": [], "chrome": [], "firefox": [], "opera": [] }
				var grayChardIndex = grayIndex;
				var blueChardIndex = blueIndex;
				vm.xAxisDate = [];
				vm.yAxisViews = [];
				vm.yAxisClicks = [];
				var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				var datee = [];
				var forDay = false;
				var maxLimit = 0;
				response.Records
					.map(function (
						record) {
						recordData.android.push(record.android);
						recordData.firefox.push(record.firefox);
						recordData.chrome.push(record.chrome);
						recordData.opera.push(record.opera);
						//recordData.safari.push(record.safari);
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
						vm.xAxisDate
							.push(datee);
						maxLimit = Math.max(maxLimit, record.android, record.firefox, record.chrome, record.opera);
					});


				//var maxLimit = 0;

				$scope.chartConfig = {
					chart: {
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
						crosshair: {
							dashStyle: 'ShortDashDot'
						},
						type: 'Number',
						tickInterval: 1,
						gridLineColor: '#f4f4f4',
						labels: {
							//align: 'left',  This is commented to move the value to left on xaxis.
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
						gridLineColor: '#f4f4f4',
						title: {
							text: ''
						},
						min: 0,
						max: maxLimit + 5,
						allowDecimals: false,
					},
					tooltip: {
						headerFormat: '',
						pointFormat: '<b>{point.y}</b> Subscribers<br/>',
						//borderColor:'grey',
						formatter: function () {
							this.series.chart.renderer.symbols.callout = vm.callOut;

							var s1 = this.series.chart.series[0].processedYData[this.point.index];
							var s2 = this.series.chart.series[1].processedYData[this.point.index];
							var s3 = this.series.chart.series[2].processedYData[this.point.index];
							var s4 = this.series.chart.series[3].processedYData[this.point.index];
							var s1Name = this.series.chart.series[0].name;
							var s2Name = this.series.chart.series[1].name;
							var s3Name = this.series.chart.series[2].name;
							var s4Name = this.series.chart.series[3].name;
							var listSeries={}
							listSeries[s1Name] = s1;
							listSeries[s2Name] = s2;
							listSeries[s3Name] = s3;
							listSeries[s4Name] = s4;
							
							listOfSeries = getMatchingSeriesValues(this.series.name, listSeries);
							var tooltipText='';
							for (var key in listOfSeries) {
								tooltipText=tooltipText+key+": "+listOfSeries[key]+' Subscribers<br/>';
							}

							return tooltipText;
							//return this.series.name+": " + this.y + ' Subscribers<br/>';
						}
					},
					plotOptions: {
						series: {
							marker: {
								enabled: false,
								symbol: 'circle',
								fillColor: 'white',
								radius: 1
							},
							states: {
								hover: {
									enabled: true
								}
							}
						},
					},
					series: [
						// {
						// 	color: platformDetail.safari.color,
						// 	showInLegend: false,
						// 	name: 'Safari',
						// 	data: recordData.safari
						// },
						{
							color: platformDetail.chrome.color,
							showInLegend: false,
							name: 'Chrome',
							data: recordData.chrome,
						}, {
							color: platformDetail.firefox.color,
							showInLegend: false,
							name: 'Firefox',
							data: recordData.firefox
						}, {
							color: platformDetail.android.color,
							showInLegend: false,
							name: 'Android',
							data: recordData.android
						}, {
							color: platformDetail.opera.color,
							showInLegend: false,
							name: 'Opera',
							data: recordData.opera
						}]
				};
			}

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
				$('#trendcalView').removeClass("io-calender");
				platformSrvc.oneDayviewsclick(current).then(
					function (response) {
						if (response.Result == "Success") {
							vm.chartType = 'day';
							clickedOnOneDAy = 1;
							clickedOnCalender = 0;
							clickedOnOneWeek = 0;
							day_week_date = 1;
							initialDate = moment()
								.subtract(0, 'days');
							finalDate = moment();
							setChartConfig(response, 1, indexGray, indexBlue);

						} else {
							console.log("some error text");
						}
					});

			}

			vm.oneWeek = function (activeTab, indexGray, indexBlue) {
				vm.dateRange();
				$('#trendcalView').removeClass("io-calender");
				platformSrvc
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

				platformSrvc
					.calendarviewsclick(getDate[0],
					getDate[1])
					.then(
					function (response) {
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
				platformSrvc.calendarviewsclick(initialDate, finalDate).then(
					function (response) {
						if (response.Result == "Success") {
							setChartConfig(response);
						} else {
							console.log("some error text");
						}
					});
			}

			vm.dayButtonFunction = function (initial) {
				platformSrvc.oneDayviewsclick(initial)
					.then(
					function (response) {
						if (response.Result == "Success") {
							setChartConfig(response, 1);

						} else {
							console.log("some error text");
						}
					});
			}

			// for previous button
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
				$('#trendcalView').daterangepicker(
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
				vm.websites = [];
				vm.showArticle = false;
			}
		}],
		controllerAs: 'vm'
	});
})();