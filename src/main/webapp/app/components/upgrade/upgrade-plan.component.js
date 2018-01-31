(function () {
	var app = angular.module('app');
	app.component('upgradePlan', {
		// defines a two way binding in and out of the component
		bindings: {
			formdata: "="
		},
		// Load the template
		templateUrl: 'app/components/upgrade/upgrade-plan.html',
		controller: ['$scope', '$uibModal', '$location', '$cookies', '$rootScope', 'utilitySrvc', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', '$state', 'paymentSrvc', '$window', function ($scope, $uibModal, $location, $cookies, $rootScope, utilitySrvc, $stateParams, $q, $timeout, $cookieStore, message, $state, paymentSrvc, $window) {
			var vm = this;
			if ($cookies) {
				var userdata = $cookies.get("userData");
				if (!userdata) {
					$state.go("iopush.unauth.login");
				}
			}
			vm.planNames = ["PREMIUM", "BUSINESS"];
			vm.priceForPlans = {};

			vm.fetchPlanPrices = function () {
				paymentSrvc.fetchUserPlans().then(function (response) {
					var getListForParticularPlan = null;
					if (response.data && response.data.Records) {
						for (var i = 0; i < vm.planNames.length; i++) {
							getListForParticularPlan = response.data.Records.filter(function (item) {
								return item.planName == vm.planNames[i];
							})
							getListForParticularPlan = sortListByPrice(getListForParticularPlan);
							vm.priceForPlans[vm.planNames[i]] = getListForParticularPlan;
							vm.initializeSlider(vm.planNames[i], getListForParticularPlan)
						}
					}
				
				}, function (err) {
					console.log("Something Wrong with API.")	
				});
			}
			vm.fetchPlanPrices();

			function sortListByPrice(list) {
				list.sort(function (a, b) {
					return a.pricing - b.pricing;
				});
				return list;
			}

			vm.sliderPremiumEventHandlers = {
				change: function (values, handle, unencoded) {
					if (values == 0 || values == 0.00 || values == 0.0) {
						vm.sliderPremium.start = vm.priceForPlans["PREMIUM"][0].subscribersLimit;
						vm.premiumPrice = vm.priceForPlans["PREMIUM"][0].pricing;
						vm.selectedPremiumPlanId = vm.priceForPlans["PREMIUM"][0].planId;
						vm.selectedPremiumPackageId = vm.priceForPlans["PREMIUM"][0].packageId;
						return;
					}
					if (values <= vm.priceForPlans["PREMIUM"][0].subscribersLimit) {
						vm.premiumPrice = vm.priceForPlans["PREMIUM"][0].pricing;
						vm.selectedPremiumPlanId = vm.priceForPlans["PREMIUM"][0].planId;
						vm.selectedPremiumPackageId = vm.priceForPlans["PREMIUM"][0].packageId;
						return "";
					}
					if ((values > vm.priceForPlans["PREMIUM"][0].subscribersLimit) && (values <= vm.priceForPlans["PREMIUM"][1].subscribersLimit)) {
						vm.premiumPrice = vm.priceForPlans["PREMIUM"][1].pricing;
						vm.selectedPremiumPlanId = vm.priceForPlans["PREMIUM"][1].planId;
						vm.selectedPremiumPackageId = vm.priceForPlans["PREMIUM"][1].packageId;
						return "";
					}
					vm.premiumPrice = vm.priceForPlans["PREMIUM"][2].pricing;
					vm.selectedPremiumPlanId = vm.priceForPlans["PREMIUM"][2].planId;
					vm.selectedPremiumPackageId = vm.priceForPlans["PREMIUM"][2].packageId;
					return ""
				}
			}


			vm.initializeSlider = function (name, list) {
				if (list && list.length > 0) {
					switch (name) {
						case "PREMIUM":
							vm.premiumPrice = list[0].pricing;
							vm.sliderPremium = {
								start: list[0].subscribersLimit,
								snap: true,
								connect: 'lower'
								// range: {
								// 	'min': 0,
								// 	'20%': list[0].subscriberLimit,
								// 	'50%': list[1].subscriberLimit,
								// 	'max': list[2].subscriberLimit
								// }
							};
							if (list.length == 3) {
								vm.sliderPremium.range = {
									'min': 0,
									'20%': list[0].subscribersLimit,
									'50%': list[1].subscribersLimit,
									'max': list[2].subscribersLimit
								}
							}
							if (list.length == 2) {
								vm.sliderPremium.range = {
									'min': 0,
									'30%': list[0].subscribersLimit,
									'max': list[1].subscribersLimit
								}
							}
							if (list.length == 1) {
								vm.sliderPremium.range = {
									'min': 0,
									'max': list[0].subscribersLimit
								}
							}
							vm.selectedPremiumPlanId = vm.priceForPlans["PREMIUM"][0].planId;
							vm.selectedPremiumPackageId = vm.priceForPlans["PREMIUM"][0].packageId;
							break;
						case "BUSINESS":
							vm.businessPrice = list[0].pricing;
							vm.sliderBusiness = {
								start: list[0].subscribersLimit,
								snap: true,
								connect: 'lower'
								// range: {
								// 	'min': 0,
								// 	'30%': list[0].subscriberLimit,
								// 	'max': list[1].subscriberLimit
								// }
							};
							if (list.length > 1) {
								vm.sliderBusiness.range = {
									'min': 0,
									'30%': list[0].subscribersLimit,
									'max': list[1].subscribersLimit
								}

							};
							if (list.length == 1) {
								vm.sliderBusiness.range = {
									'min': 0,
									'max': list[0].subscribersLimit
								}
							}
							vm.selectedBusinessPlanId = vm.priceForPlans["BUSINESS"][0].planId;
							vm.selectedBusinessPackageId = vm.priceForPlans["BUSINESS"][0].packageId;
							break;
						default:
							break;
					}
				}


			}


			vm.sliderBusinessEventHandlers = {
				change: function (values, handle, unencoded) {
					if (values == 0 || values == 0.00 || values == 0.0) {
						vm.sliderBusiness.start = vm.priceForPlans["BUSINESS"][0].subscribersLimit;
						vm.businessPrice = vm.priceForPlans["BUSINESS"][0].pricing;
						vm.selectedBusinessPlanId = vm.priceForPlans["BUSINESS"][0].planId;
						vm.selectedBusinessPackageId = vm.priceForPlans["BUSINESS"][0].packageId;
						return;
					}
					if (values <= vm.priceForPlans["BUSINESS"][0].subscribersLimit) {
						vm.businessPrice = vm.priceForPlans["BUSINESS"][0].pricing;
						vm.selectedBusinessPlanId = vm.priceForPlans["BUSINESS"][0].planId;
						vm.selectedBusinessPackageId = vm.priceForPlans["BUSINESS"][0].packageId;
						return "";
					}

					vm.businessPrice = vm.priceForPlans["BUSINESS"][1].pricing;
					vm.selectedBusinessPlanId = vm.priceForPlans["BUSINESS"][1].planId;
					vm.selectedBusinessPackageId = vm.priceForPlans["BUSINESS"][1].packageId;
					return ""
				}
			}

			vm.purchasePlan = function (planType) {
				var subscribers = 0;
				var price = 0;
				var planId = 0;
				switch (planType) {
					case "PREMIUM":
						subscribers = vm.sliderPremium.start;
						price = vm.premiumPrice;
						planId = vm.selectedPremiumPlanId;
						packageId=vm.selectedPremiumPackageId;
						break;
					case "BUSINESS":
						subscribers = vm.sliderBusiness.start;
						price = vm.businessPrice;
						planId = vm.selectedBusinessPlanId;
						packageId=vm.selectedBusinessPackageId;
						break;
				}
				var plan = { planId, "limit": subscribers, "amount": price,"packageId":packageId };
				paymentSrvc.selectPlan(plan).then(function (response) {
					if (response.data) {
						if ((response.data.statusCode == 201) && (response.data.data)) {
							$window.location.href = response.data.data[0];
						}
						else {
							$state.go("iopush.auth.planerror", { "name": "Error", "message": "Please try again later." })
						}
					}
				}, function (error) {
					$state.go("iopush.auth.planerror", { "name": "Error", "message": "Something went wrong. Please try again later." })
					console.log(error);
				});
			}

			vm.openContactForm = function () {

				$uibModal.open({
					animation: true,
					template: '<get-in-touch close-modal="vm.closeModal"></get-in-touch>',
					size: 'md',
					controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
						var vm = this;
						vm.closeModal = function () {
							$uibModalInstance.dismiss();
						}
					}],
					controllerAs: 'vm'
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


		}],

		controllerAs: 'vm'
	});
})();