(function () {
	var app = angular.module('app');
	app.component('sidebar', {
		bindings: {

		},
		templateUrl: 'app/components/sidebar/sidebar.html',
		controller: function ($scope, $rootScope, $cookies, $cookieStore, $location, $state) {
			$scope.setBoxOpen = false;
			$scope.suportClass = "support-box";


			$scope.$watch(function () {
				return $cookies.get('sellAllCampaignStats');
			}, function (newVal, oldVal) {
				if (newVal) {
					if (newVal === "7")
						$scope.isBoxOpenAnalytic();
				}
			});


			$scope.isBoxOpenAnalytic = function () {
				//alert('working!!');
				$scope.setBoxOpenAnalytic = !$scope.setBoxOpenAnalytic;
				if ($scope.suportClassAnalytic === 'support-box dropup') {
					$scope.suportClassAnalytic = "support-box";
				} else {
					$scope.suportClassAnalytic = "support-box dropup";
				}
				//$scope.changeClass(7);
			}

			$scope.$watch(function () {
				return $state.current.name;
			}, function (newval, oldval) {
				$scope.activateMenu();
			})

			$scope.activateMenu = function () {
				$scope.dashboard = false; $scope.campaign = false; $scope.campaignType = false;
				$scope.analyticCampaign = false; $scope.analytic = false; $scope.codeImplementation = false; $scope.welcomeNotification = false; $scope.managepushtorss = false;
				$scope.pushtorsscreate = false; $scope.subscriptionLayouts = false; $scope.manageWelcomeNotification = false; $scope.managesegmentationtype = false;
				$scope.codeImplementations = false; $scope.setBoxOpenDesktopMobile = false;


				switch ($state.current.name) {
					case 'iopush.auth.plansummary':
						break;
					case 'iopush.auth.dashboard':
						$scope.dashboard = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.campaign':

						$scope.campaign = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.notificationcampaign':
					case 'iopush.auth.notificationcampaignEdit':
						$scope.campaignType = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.pushtorssCreate':
					case 'iopush.auth.pushtorssEdit':
						$scope.pushtorsscreate = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.managepushtorss':
						$scope.managepushtorss = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.welcomeNotification':
					case 'iopush.auth.editWelcomeNotification':
						$scope.welcomeNotification = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.analytic':
						$scope.analyticCampaign = true;
						$scope.setBoxOpenCodeImplementation = false;
						//$scope.setBoxOpenAnalytic=false;
						//$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						$scope.analytic = true; $scope.rsspushanalytic = false; $scope.welcomeanalytic = false;
						break;
					case 'iopush.auth.subscriptionLayouts':
					case 'iopush.auth.subscriptionLayoutsBox':
					case 'iopush.auth.subscriptionLayoutOverlay':

					case 'iopush.auth.subscriptionLayoutNative':
					case 'iopush.auth.subscriptionLayoutTopline':
					case 'iopush.auth.subscriptionLayoutIcon':
					case 'iopush.auth.subscriptionLayoutSidebar':
					case 'iopush.auth.subscriptionLayoutButtonLink':

						$scope.subscriptionLayouts = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						$scope.subLayoutDesktop = true;
						$scope.subLayoutMobile = false;
						$scope.setBoxOpenDesktopMobile = true;

						break;
					case 'iopush.auth.subscriptionLayoutMobile':
					case 'iopush.auth.subscriptionLayoutMobileNative':
					case 'iopush.auth.mobileSubscriptionLayouts':
						$scope.subscriptionLayouts = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						$scope.subLayoutDesktop = false;
						$scope.subLayoutMobile = true;
						$scope.setBoxOpenDesktopMobile = true;

						break;
					case 'iopush.auth.manageWelcomeNotification':
						$scope.manageWelcomeNotification = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
					case 'iopush.auth.rsspushanalytic':
						$scope.analyticCampaign = true;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.setBoxOpenAnalytic = true;
						//$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						$scope.analytic = false; $scope.rsspushanalytic = true; $scope.welcomeanalytic = false;
						break;
					case 'iopush.auth.welcomeanalytic':
						$scope.analyticCampaign = true;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.setBoxOpenAnalytic = true;
						//$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						$scope.analytic = false; $scope.rsspushanalytic = false; $scope.welcomeanalytic = true;
						break;
					case 'iopush.auth.codeImplementation':
						$scope.codeImplementations = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.uniqueCode = true; $scope.subscribersegmentation = false; $scope.managesegmentation = false; $scope.managesegmentationtype = false;
						break;

					case 'iopush.auth.subscriberSegmentation':
					case 'iopush.auth.subscriberSegmentationEdit':
						$scope.codeImplementations = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = true;
						$scope.uniqueCode = false; $scope.subscribersegmentation = true; $scope.managesegmentation = false; $scope.managesegmentationtype = false;
						break;
					case 'iopush.auth.manageSegments':
						$scope.codeImplementations = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = true;
						$scope.uniqueCode = false; $scope.subscribersegmentation = false; $scope.managesegmentation = true; $scope.managesegmentationtype = false;
						break;
					case 'iopush.auth.manageSegmentsType':
						$scope.codeImplementations = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = true;
						$scope.uniqueCode = false; $scope.subscribersegmentation = false; $scope.managesegmentation = false; $scope.managesegmentationtype = true;
						break;
					case 'iopush.auth.upgradeplan':
						break;

					default:
						$scope.dashboard = true;
						$scope.setBoxOpenAnalytic = false;
						$scope.setBoxOpenCodeImplementation = false;
						$scope.suportClassAnalytic = "support-box";
						$scope.suportClassCodeImplementation = "support-box";
						break;
				}
			}


			$scope.isBoxOpenCodeImplementation = function () {
				//alert('working!!');
				$scope.setBoxOpenCodeImplementation = !$scope.setBoxOpenCodeImplementation;
				if ($scope.suportClassCodeImplementation === 'support-box dropup') {
					$scope.suportClassCodeImplementation = "support-box";
				} else {
					$scope.suportClassCodeImplementation = "support-box dropup";
				}
			}


			$scope.isBoxOpen = function () {
				$scope.setBoxOpen = !$scope.setBoxOpen;
				if ($scope.suportClass === 'support-box dropup') {
					$scope.suportClass = "support-box";
				} else {
					$scope.suportClass = "support-box dropup";
				}
			}

			$scope.isBoxOpenDesktopMobile = function () {
				$scope.setBoxOpenDesktopMobile = !$scope.setBoxOpenDesktopMobile;
			}
		}
	});
})();   