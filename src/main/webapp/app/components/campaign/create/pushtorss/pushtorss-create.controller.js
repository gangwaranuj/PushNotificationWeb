(function () {
	var app = angular.module('app');
	app.controller('pushtorssCreateCtrl', ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', '$cookies', '$rootScope', 'campaignSrvc', 'utilitySrvc', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', function ($scope, $uibModal, WizardHandler, masterSrvc, $location, $cookies, $rootScope, campaignSrvc, utilitySrvc, $stateParams, $q, $timeout, $cookieStore, message) {
		var vm = this;
		vm.next = false;
		var expression = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'

			var url = new RegExp(expression, 'i');
		var successCss = "io-icon io-md-icon io-successful";
		var failedCss = "io-icon io-md-icon io-failled";
		vm.setImage = "Automated";
		vm.isSelectImage = true;
		var cityDetail;
		vm.uploadedimage = [];
		vm.imgClass = "active";
		vm.updImgClass = "inActive";
		vm.isSelectImage = true;
		vm.isuploadImage = false;
		var internetProviderDetail;
		var segmentDetail;
		var segmentTypesDetail;
		vm.selectedImage = "images/preview-icon.png";
		vm.imageType = 'D';
		vm.products = "1";
		vm.maxdate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD'));
		vm.isSub = false;

		vm.preImages = [
		                { imageSrc: 'images/png/agenda.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/ai.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/airplane.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/armchair.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/backpack.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/band-aid.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/bar-chart.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/basketball-jersey.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/bell.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/bird.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/bowling.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/box.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/briefcase.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/browser.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/browser-1.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/calculator.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/calendar.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/camera.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/car.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/certificate.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/chat.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/checked.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/chemistry.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/clipboard.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/clock.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/compass.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/cone.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/contract.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/credit-card.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/cup.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/devices.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/diamond.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/doughnut.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/earth-globe.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/eraser.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/eye.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/film.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/folder.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/fried-egg.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/gamepad.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/gift.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/girl.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/headphones.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/heart.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/help.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/imac.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/invoice.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/ipad.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/iphone.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/keyboard.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/letter.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/macbook.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/magician.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/map.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/medal.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/megaphone.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/mind.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/money.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/monitor.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/mortarboard.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/newspaper.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/padlock.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/paint-brush.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/pantone.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/passport.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/pencil.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/pictures.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/pie-chart.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/piggy-bank.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/printer.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/ps.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/rocket.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/satellite.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/search.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/server.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/settings.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/shield.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/shoe.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/shopping-bag.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/sim-card.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/smartphone.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/snow-globe.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/spray.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/store.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/super-8.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/switch.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/tablet.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/tag.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/target.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/temperature.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/theater.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/thermometer.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/trash.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/twitter.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/ufo.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/umbrella.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/user.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/wallet.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/webcam.png', imgtype: 'pre', selected: false },
		                { imageSrc: 'images/png/youtube.png', imgtype: 'pre', selected: false }


		                ];


		vm.platforms1 = {
				name: 'Select Platforms',
				valueProp: 'DropdownID',
				displayProp: 'Value',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]

		};

		vm.countries = {
				name: 'Select Countries',
				valueProp: 'DropdownID',
				displayProp: 'DisplayText',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]

		};

		vm.cities = {
				name: 'Select Cities',
				valueProp: 'DropdownID',
				displayProp: 'DisplayText',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]
		};

		vm.internetProviders = {
				name: 'Select Internet Service Providers',
				valueProp: 'Value',
				displayProp: 'DisplayText',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]
		};

		vm.segmentTypes = {
				name: 'Select Segment Type',
				valueProp: 'Value',
				displayProp: 'DisplayText',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]
		};

		vm.segments = {
				name: 'Select Segments',
				valueProp: 'Value',
				displayProp: 'DisplayText',
				containerClass: 'multiSelect',
				selectedOptions: [],
				options: [
				          ]
		};


		vm.uploadImage = function () {
			vm.imgClass = "inActive";
			vm.updImgClass = "active";
			vm.isSelectImage = false;
			vm.isuploadImage = true;
			if (!vm.isuploadImage) {
				vm.selectedImage = "images/preview-icon.png";
			}
			vm.preImages.forEach(function (img) {
				img.selected = false;
			});


		};

		vm.selectImage = function () {
			vm.imgClass = "active";
			vm.updImgClass = "inActive";
			vm.isSelectImage = true;
			vm.isuploadImage = false;

			vm.uploadedimage = [];
			$('#fileselect').val('');
			if (!vm.isSelectImage) {
				vm.selectedImage = "images/preview-icon.png";
			}

		};

		vm.getImageType = function (type) {
			vm.imageType = type;
		};

		vm.deleteSubDate = function () {
			vm.subscribedStartDate = "";
		};


		$scope.$watch("vm.subscribedStartDate", function (newval, oldval) {
			if (!newval || newval === "") {
				vm.isSub = false;
			}
			else {
				vm.isSub = true;
			}
		});


		$scope.$watch("vm.countries.selectedOptions", function (newval, oldval) {
			var countryIDStr = '';
			if (newval.length > 1) {
				vm.countries.name = 'Countries';
			}
			else if (newval.length === 1) {
				vm.countries.name = 'Country';
			}
			else {
				vm.countries.name = 'Select countries';
			}
			if (newval.length == 0) {
				vm.internetProviders.options = [];
				vm.internetProviders.selectedOptions = [];
				$rootScope.timezone = "Europe/Zurich";
				$cookies.put('timezone', "Europe/Zurich");
				vm.cities.options = [];
				vm.cities.selectedOptions = [];
			}
			if (newval.length == 1) {
				$cookies.put('timezone', newval[0].Value);
				$rootScope.timezone = newval[0].Value;
				vm.cities.selectedOptions = [];
				_getCitiesByCountryId(newval[0].DropdownID);
				_getInternetProvider(newval[0].DropdownID);
			}
			else if (newval.length > 1) {
				$rootScope.timezone = "Europe/Zurich";
				$cookies.put('timezone', "Europe/Zurich");
				vm.cities.options = [];
				vm.cities.selectedOptions = [];
				for (var i = 0; i < newval.length; i++) {
					if (countryIDStr)
						countryIDStr = countryIDStr + ',' + (newval[i].DropdownID.toString());
					else
						countryIDStr = (newval[i].DropdownID.toString());
				}
				_getInternetProvider(countryIDStr);
			}
		});

		$scope.$watch("vm.segmentTypes.selectedOptions", function (newval, oldval) {
			var segmentTypeIDStr = '';
			if (newval.length > 1) {
				vm.segmentTypes.name = 'Segment types';
			}
			else if (newval.length === 1) {
				vm.segmentTypes.name = 'Segment type';
				_getSegments(newval[0].Value);
			}
			else {
				vm.segmentTypes.name = 'Segment type';
			}
			if (newval.length == 0) {
				vm.segments.options = [];
				vm.segments.selectedOptions = [];

			}
			if (newval.length > 1) {
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

		$scope.$watch("vm.segments.selectedOptions", function (newval, oldval) {

			if (newval.length > 1) {
				vm.segments.name = 'Segments';
			}
			else if (newval.length === 1) {
				vm.segments.name = 'Segment';
			}
			else {
				vm.segments.name = 'Segment name';
			}
		});

		var _getCitiesByCountryId = function (countryId) {

			campaignSrvc.getCitiesByCountryId(countryId).then(function (response) {
				//     vm.form.segment.cities.options = response.data.Records.map(function (record) {
				//         record.DisplayText = record.city_name
				//         return record;
				//     })
				if (response.data.Result === "Success") {
					vm.cities.options = response.data.Records.map(function (record) {
						record.DisplayText = record.DisplayText;
						return record;
					});
				}
				else {
					vm.cities.options = [];
				}

				if (cityDetail && cityDetail.length > 0 && cityDetail[0] !== "") {
					vm.city = true;
					vm.cities.selectedOptions = vm.cities.options.filter(function (city) {
						return cityDetail.includes(city.DropdownID.toString());
					})
				}

			});
		};
		var _getInternetProvider = function (countryId) {

			campaignSrvc.getISPByCountryId(countryId).then(function (response) {
				if (response.data.Result === "Success") {
					vm.internetProviders.options = response.data.Records.map(function (record) {
						record.DisplayText = record.DisplayText;
						return record;
					});
				}
				else {
					vm.internetProviders.options = [];
				}

				if (internetProviderDetail && internetProviderDetail.length > 0 && internetProviderDetail[0] !== "") {
					vm.ISP = true;
					vm.internetProviders.selectedOptions = vm.internetProviders.options.filter(function (ISP) {
						return internetProviderDetail.includes(ISP.Value.toString());
					})
				}

			});
		};

		var _getSegments = function (segmenttypeIds) {

			masterSrvc.getSegments(segmenttypeIds).then(function (response) {
				if (response.Result === "Success") {
					vm.segments.options = response.Records.map(function (record) {
						record.DisplayText = record.DisplayText;
						return record;
					});
				}
				else {
					vm.segments.options = [];
				}

				if (segmentDetail && segmentDetail.length > 0 && segmentDetail[0] !== "") {
					// vm.ISP = true;
					vm.segments.selectedOptions = vm.segments.options.filter(function (segment) {
						return segmentDetail.includes(segment.Value.toString());
					})
				}

			});
		};



		var _getCountries = (function () {
			campaignSrvc.getCountriesTimeZones().then(function (response) {
				vm.countries.options = response.Records
			}).then(function (response) { })
		})();


		var _getPlatforms = (function () {
			campaignSrvc.getPlatforms().then(function (response) {
				// console.log("response",response);
				vm.platforms1.options = response.Records;
			}).then(function (response) { })
		})();

		var _getSegmentTypes = (function () {
			masterSrvc.getSegmentTypes().then(function (response) {

				vm.segmentTypes.options = response.Records;
			}).then(function (response) { })
		})();

		$scope.$watch("vm.platforms1.selectedOptions", function (newval, oldval) {

			if (newval.length > 1) {
				vm.platforms1.name = 'Platforms';
			}
			else if (newval.length === 1) {
				vm.platforms1.name = 'Platform';
			}
			else {
				vm.platforms1.name = 'Select platforms';
			}
		});

		$scope.$watch("vm.cities.selectedOptions", function (newval, oldval) {

			if (newval.length > 1) {
				vm.cities.name = 'Cities';
			}
			else if (newval.length === 1) {
				vm.cities.name = 'City';
			}
			else {
				vm.cities.name = 'Select cities';
			}
		});

		$scope.$watch("vm.internetProviders.selectedOptions", function (newval, oldval) {

			if (newval.length > 1) {
				vm.internetProviders.name = 'Internet service providers';
			}
			else if (newval.length === 1) {
				vm.internetProviders.name = 'Internet service provider';
			}
			else {
				vm.internetProviders.name = 'Select internet service providers';
			}
		});

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
				size: 'sm',
				windowClass: 'messages-sm-modal',
				resolve: {
					confirmationMessage: function () {
						return confirmationMessage;
					}
				}
			});
		};


		function validate() {
			var validationPass = true;
			var currentDate = new Date();
			// currentDate.setHours(00);
			//  currentDate.sett

			//  var currentDate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));

			var regax = /^[a-z0-9_]+$/i;

			if (!(vm.campaignName) || vm.campaignName === '') {
				validationPass = false;
				vm.messageBox(message.createRSSPush.rssPushNameRequire);
				//vm.messageBox("Please enter RSS name");
				return validationPass;
			}
			else if (vm.campaignName.length > 150) {
				validationPass = false;
				vm.messageBox(message.createRSSPush.rssPushNameLength);
				// vm.messageBox( "Campaign name should be less or equal to 50 character");
				return validationPass;
			}


			else if (!regax.test(vm.campaignName)) {
				validationPass = false;
				vm.messageBox(message.createRSSPush.rssPushNameFormat);
				return validationPass;
			}

			else if (!vm.url || vm.url === '') {
				validationPass = false;
				vm.messageBox(message.createRSSPush.urlRequire);
				return validationPass;
			}
			else if (vm.url.length > 400) {
				validationPass = false;
				vm.messageBox(message.createRSSPush.urlLength);
				// vm.messageBox( "Campaign name should be less or equal to 50 character");
				return validationPass;
			}
			else if (vm.imageType === 'C') {
				if (!vm.selectedImage || (vm.selectedImage === "images/preview-icon.png")) {
					validationPass = false;
					vm.messageBox(message.createRSSPush.imageRequire);
					return validationPass;
				}
			}
			else if (vm.url !== '') {
				if (!url.test(vm.url)) {
					validationPass = false;
					vm.messageBox(message.createRSSPush.urlFormat);
					return validationPass;
				}
				else {
					return vm.loadUrlMetaData();
				}

			}





			return validationPass;

		}

		vm.launchConfirmationMessage = function (confirmationMessage, cssClass) {
			$uibModal.open({
				animation: true,
				templateUrl: 'app/shared/templates/message.html',
				controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', 'message', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage, message) {


					modalScope.closeModal = function () {
						$uibModalInstance.dismiss();
						//$cookies.put("aciveMenu", 4);
						$state.go('iopush.auth.managepushtorss');
					};
					modalScope.confirmationMessage = { msg: confirmationMessage, css: cssClass };


					// $timeout(function () {
					//   $uibModalInstance.dismiss();
					//   $cookies.put("aciveMenu", 4);
					//   $state.go('iopush.auth.managepushtorss');
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
		};


		vm.saveCampaign = function (isSendNotification, Btn) {
			var deferred = $q.defer();
			var isClickActive = false;
			vm.saving = true;
			if (!validate()) { vm.saving = false; vm.launching = false; return; }


			// if (!valid) return;
			var _data = {
					name: vm.campaignName,
					url: vm.url,
					source: vm.source,
					generic: vm.generic,
					campaign: vm.urlCampaign,
					notification: false,
					products: vm.products,
					logo: vm.selectedImage,
					useAutomatedImage: vm.imageType === 'C' ? false : true
			};
			if (Btn == 'Save') {
				_data.activateRSS = false;
				isClickActive = false;
			}
			if (Btn == 'Activate') {
				_data.activateRSS = true;
				isClickActive = true;
			}
			_data.platform = "";

			if (vm.subscribedStartDate && vm.subscribedStartDate !== "") {
				_data.subscribedFrom = utilitySrvc.getDateFormat(vm.subscribedStartDate);
			}
			else {
				_data.subscribedFrom = "";
			}

			if (vm.internetProviders.selectedOptions.length > 0) {
				var _internetProviderValues = vm.internetProviders.selectedOptions.map(function (data) {
					return data.Value;
				});
				_data.isps = _internetProviderValues.length > 1 ?
						_internetProviderValues.join(',') : _internetProviderValues.toString();
			}

			if (vm.platforms1.selectedOptions.length > 0) {
				var _platforms = vm.platforms1.selectedOptions.map(function (data) {
					return data.DropdownID;
				});
				_data.platform = _platforms.length > 1 ?
						_platforms.join(',') : _platforms.toString();
			}


			if (vm.countries.selectedOptions.length > 0) {
				var _countryValues = vm.countries.selectedOptions.map(function (data) {
					return data.DropdownID;
				});
				_data.countries = _countryValues.length > 1 ?
						_countryValues.join(',') : _countryValues.toString();
			}


			if (vm.countries.selectedOptions.length === 1 && vm.cities.selectedOptions.length > 0) {
				var citiesValues = vm.cities.selectedOptions.map(function (data) {
					return data.DropdownID;
				})
				_data.cities = citiesValues.length > 1 ?
						citiesValues.join(',') : citiesValues.toString();
			}


			if (vm.segmentTypes.selectedOptions.length > 0) {
				var _segmentTypeValues = vm.segmentTypes.selectedOptions.map(function (data) {
					return data.Value;
				});
				_data.segmentTypes = _segmentTypeValues.length > 1 ?
						_segmentTypeValues.join(',') : _segmentTypeValues.toString();
			}

			if (vm.segments.selectedOptions.length > 0) {
				var _segmentsValues = vm.segments.selectedOptions.map(function (data) {
					return data.Value;
				});
				_data.segments = _segmentsValues.length > 1 ?
						_segmentsValues.join(',') : _segmentsValues.toString();
			}


			_data.logo = vm.selectedImage;
			if ($stateParams.id || vm.id) {
				var id = $stateParams.id;
				vm.id = $stateParams.id ? $stateParams.id : vm.id;
				_data.id = $stateParams.id ? $stateParams.id : vm.id;
				// _data.logo = vm.selectedImage;

				convertImgToDataURLviaCanvas(vm.selectedImage, function (data) {

					$timeout(function () {
						vm.selectedImage = data;
						_data.logo = vm.selectedImage;


						campaignSrvc.updateRSSFeedCampaign(_data).then(function (response) {
							if (response.data.Result === "SUCCESS") {
								vm.saving = false;
								//vm.onSave();
								deferred.resolve("Success");

								vm.launchConfirmationMessage(isClickActive ? message.createRSSPush.rssActivate : message.createRSSPush.rssupdate, successCss);

								// if (!isSendNotification) {
								//   vm.launchConfirmationMessage(message.createRSSPush.rssupdate, successCss);
								// }
							}
							else {
								deferred.resolve("Failed");
								vm.saved = true;
								// validationPass = false;
								// vm.saving = false
								//vm.messageBox(message.createRSSPush.rssUpdationFailed);
								//message: from backend
								vm.messageBox(response.data.Message);
							}
						}, function () {

						});

					}, 0);
				});


			}
			else {
				campaignSrvc.saveRSSFeedCampaign(_data).then(function (response) {

					if (response.data.Result === "SUCCESS") {
						vm.saved = true;
						vm.savedOnly = true;
						vm.id = response.data.Record.id;
						deferred.resolve("Success");

						vm.launchConfirmationMessage(isClickActive ? message.createRSSPush.rssActivate : message.createRSSPush.rssSaved, successCss);
						// if (!isSendNotification) {
						//   vm.launchConfirmationMessage(isClickActive? message.createRSSPush.rssActivate:message.createRSSPush.rssSaved, successCss);
						// }
					}
					else {
						deferred.resolve("Failed");
						//validationPass = false;
						vm.saving = false;
						//vm.messageBox(message.createRSSPush.rssFailed);
						vm.messageBox(response.data.Message);
						return;
					}
				}, function (response) {
				})
			}
			return deferred.promise;
		};

		vm.launchCampaign = function () {


			vm.launching = true;
			var deferred = $q.defer();
			var promise;
			var isSendNotification = true;
			promise = vm.saveCampaign(isSendNotification, 'Activate');
			// if (vm.savedOnly === true) {
			//     deferred.resolve("Success");
			//     promise = deferred.promise;
			// }

			promise.then(function (result) {

				if (result === "Failed") {
					vm.launching = false;
					return;
				}


				if ($stateParams.id) {
					//  vm.saved = true;
					vm.id = $stateParams.id;
				}



				//  vm.formdata.confimation.description = 'You can view the campaign on "Manage Campaigns"';
				// campaignSrvc.sendNotification({ "id": vm.id }).then(function (response) {
				//   if (response.data.responseCode !== 200) {
				//     validationPass = false;
				//     vm.launching = false;
				//     // vm.messageBox(response.data.Message);
				//     vm.messageBox("Failed to launch campaign");
				//     return;
				//   }
				//   else {
				//     vm.launchConfirmationMessage('RSS activated successfully!', successCss);
				//   }
				//   vm.launching = false;
				//   //   WizardHandler.wizard().next();
				// }, function () {
				//   validationPass = false;
				//   //  vm.messageBox("Failed to launch campaign");
				//   return;
				// });
				// //  }

			}, function (error) {
				vm.launching = false;
			});

		};


		vm.loadUrlMetaData = function () {
			vm.next = true;
			vm.launching = true;
			vm.saving = true;

			if (!vm.url || vm.url === '') {
				vm.next = false;
				vm.messageBox(message.createRSSPush.urlRequire);
				return false;
			}
			else if (vm.url !== '') {
				if (!url.test(vm.url)) {
					vm.next = false;
					vm.messageBox(message.createRSSPush.urlFormat);
					return false;
				}
			}

			campaignSrvc.rssfeedUrlIsValid(vm.url).then(function (response) {
				//  if (response.data.Result === "INVALID") {
				if (response.data.responseCode !== 200) {
					vm.messageBox(message.createRSSPush.urlFormat);
					vm.next = false;

					return false;
				}
				else {
					vm.launching = false;
					vm.saving = false;
				}


				vm.next = false;
				return true;
			}), (function (error) {

				vm.next = false;
				return false;
			});

			return true;
		};

		function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
			var img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = function () {
				var canvas = document.createElement('CANVAS');
				var ctx = canvas.getContext('2d');
				var dataURL;
				canvas.height = this.height;
				canvas.width = this.width;
				ctx.drawImage(this, 0, 0);
				dataURL = canvas.toDataURL(outputFormat);
				callback(dataURL);
				canvas = null;
			};
			img.src = url;
		}

		vm.loadCampaign = function () {

			if ($stateParams.id) {

				vm.imgClass = "inActive";
				vm.updImgClass = "active";
				vm.isSelectImage = false;
				vm.isuploadImage = true;

				vm.isEdit = true;

				vm.saved = true;
				campaignSrvc.getRSSFeedById({ id: $stateParams.id }).then(function (response) {

					if (response.data.Result === "SUCCESS") {
						var _campaignDetail = response.data.Record;
						vm.campaignName = _campaignDetail.name;
						vm.url = _campaignDetail.url;

						vm.source = _campaignDetail.source;
						vm.generic = _campaignDetail.generic;
						vm.urlCampaign = _campaignDetail.campaign;
						vm.products = _campaignDetail.products;
						// vm.=_campaignDetail.automatedImage;
						//    vm.=_campaignDetail.logo_path;
						vm.imageType = _campaignDetail.automatedImage ? 'D' : 'C';

						vm.setImage = _campaignDetail.automatedImage ? "Automated" : "getImage";


						if (vm.imageType === "C") {
							convertImgToDataURLviaCanvas(_campaignDetail.logo_path, function (data) {

								$timeout(function () {
									vm.selectedImage = data;
								}, 0);
							});


							vm.uploadedimage.push({
								imageSrc: _campaignDetail.logo_path,//+ "?cb=" + random,//userCookiedData.imagePath,
								imgtype: 'custom'
							});
						}

						if (_campaignDetail.subscribedFrom && _campaignDetail.subscribedFrom !== "NaN-NaN-NaNTNaN:NaN:NaN") {
							vm.subscribedStartDate = _campaignDetail.subscribedFrom;
						}

						var countriesDetail = _campaignDetail.countries.split(',')
						if (countriesDetail.length > 0 && countriesDetail[0] != "") {

							vm.countries.selectedOptions = vm.countries.options.filter(function (country) {
								return countriesDetail.includes(country.DropdownID.toString());
							})
						}

						var platformsDetail = _campaignDetail.platform.split(',')
						if (platformsDetail.length > 0 && platformsDetail[0] != "") {

							vm.platforms1.selectedOptions = vm.platforms1.options.filter(function (platform) {
								return platformsDetail.includes(platform.DropdownID.toString());
							})
						}

						internetProviderDetail = _campaignDetail.isps.split(',');
						if (internetProviderDetail.length > 0 && internetProviderDetail[0] != "") {
							vm.internetProvider = true;
							vm.internetProviders.selectedOptions = vm.internetProviders.options.filter(function (ISP) {
								return internetProviderDetail.includes(ISP.Value.toString())
							});

						}


						segmentDetail = _campaignDetail.segments.split(',');
						if (segmentDetail.length > 0 && segmentDetail[0] != "") {
							// vm.internetProvider = true;
							vm.segments.selectedOptions = vm.segments.options.filter(function (segment) {
								return segmentDetail.includes(segment.Value.toString())
							})
						}


						segmentTypesDetail = _campaignDetail.segmentTypes.split(',');
						if (segmentTypesDetail.length > 0 && segmentTypesDetail[0] != "") {
							// vm.internetProvider = true;
							vm.segmentTypes.selectedOptions = vm.segmentTypes.options.filter(function (segmentType) {
								return segmentTypesDetail.includes(segmentType.Value.toString());
							});
						}


						cityDetail = _campaignDetail.cities.split(',');
						if (cityDetail.length > 0 && cityDetail[0] !== "") {

							vm.cities.selectedOptions = vm.cities.options.filter(function (city) {
								return cityDetail.includes(city.DropdownID.toString());
							})
						}




					}

				}, function (response) {
				})
			}

		};

		$timeout(function () {
			vm.loadCampaign();

		}, 0);





	}]);
})();