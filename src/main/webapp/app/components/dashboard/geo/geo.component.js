(function () {
	var app = angular.module('app');
	app.component('geo', {
		bindings: {

		},
		templateUrl: 'app/components/dashboard/geo/geo.html',
		controller: ['geoSrvc', '$window', '$uibModal', '$scope', '$timeout', 'platformDetail', 'NgMap', function (geoSrvc, $window, $uibModal, $scope, $timeout, platformDetail, NgMap) {
			var vm = this;
			var mapRender = 0;
			vm.shops = [];
			vm.platformDetail = platformDetail;

			geoSrvc.geoCountry().then(function (response) {
				vm.geosItems = response.Records;
				if (vm.geosItems) {
					vm.geosItems.forEach(function (item) {
						for (key in vm.platformDetail) {
							var data = item.browserBean.find(function (item) {
								return item.platformName.toLowerCase() == key;
							});
							if (data) {
								item[data.platformName.toLowerCase() + "Count"] = data.count;
							}
						}
					})
				}
			});

			vm.closeMap = function () {
				vm.showMap = false;
			}

			vm.getImage = function (platform) {
				return vm.platformDetail[platform].icon;
			}

			vm.openAsdf = function (geoItem) {
				mapRender = mapRender + 1;
				vm.showMap = true;

				function addPlatformCountDetail(geoobj, geoLocationObj) {
					for (key in vm.platformDetail) {
						for (var index = 0; index < geoobj.browserBean.length; index++) {
							geoLocationObj["browser" + index] = geoobj.browserBean[index].platformName;
							geoLocationObj["browser" + index + 'C'] = geoobj.browserBean[index].count;
							geoLocationObj["browser" + index + 'P'] = (Math.round((geoobj.browserBean[index].count / geoobj.totalusers) * 100));
						}
					}
				}
				if (geoItem) {
					var geoLocationObj = {
						id: 1,
						name: geoItem.geoName,
						position: [geoItem.geoLatitude, geoItem.geoLongitude],
						users: geoItem.totalusers
					}
					addPlatformCountDetail(geoItem, geoLocationObj);
					var geoGetLocations = [geoLocationObj];
					geoSrvc.geoDetails(geoItem.geoCode).then(function (response) {
						if (response.Records.length > 0) {
							geoGetLocations = [];
						}
						for (i = 0; i < response.Records.length; i++) {
							var geoLocationObj = {
								id: i,
								name: response.Records[i].city_name,
								position: [response.Records[i].city_latitude, response.Records[i].city_longitude],
								users: response.Records[i].totalusers
							}
							addPlatformCountDetail(response.Records[i], geoLocationObj);
							geoGetLocations.push(geoLocationObj);
						}
						vm.shops = geoGetLocations;
					}, function () {
						vm.shops = geoGetLocations;
					});
					$timeout(function () {
						vm.lat = geoItem.geoLatitude;
						vm.lng = geoItem.geoLongitude;
						vm.template = [];
						vm.map = NgMap.initMap('geoMap');
						if (mapRender == 1) {
							vm.mapObj = vm.map;
						}
						window.temp = vm.map;
						vm.shop = vm.shops[0];
						vm.showDetail = function (e, shop) {
							vm.shop = shop;
							vm.mapObj.showInfoWindow('foo-iw', this);
						};
						vm.hideDetail = function () {
							vm.mapObj.hideInfoWindow('foo-iw');
						};
					}, 100);
					return
				};
			}
		}],
		controllerAs: 'vm'
	});
})();