(function () {
    var app = angular.module('app');
    app.component('notificationcampaign', {
        // defines a two way binding in and out of the component
        bindings: {
 formdata: "=",
        },
        // Load the template
        templateUrl: 'app/components/campaign/notificationcampaign/notificationcampaign.html',
        controller: ['$scope', 'WizardHandler', 'campaignSrvc', '$stateParams', 'masterSrvc','configConstant','$timeout','$cookies','$rootScope', function ($scope, WizardHandler, campaignSrvc, $stateParams, masterSrvc,configConstant,$timeout,$cookies,$rootScope) {
            var vm = this;
            var cityDetail;
            var currentStep = $stateParams.step || 0;

            $scope.$watch(function () {
                return WizardHandler.wizard();
            }, function (wizard) {
                if (wizard)
                    wizard.goTo(currentStep);
            });

            vm.form = {}
            vm.form.newsfeed = {};
            vm.form.notification = {};
            vm.form.notification.images = [];

            vm.form.confimation = {};
            vm.form.confimation.message = "";
            vm.form.confimation.description = "";


            vm.form.segment = {
                typeId: 3,
                timezones: {
                    name: 'Timezone',
                    valueProp: 'Value',
                    displayProp: 'DisplayText',
                    containerClass: 'multiSelect',
                    selectedOptions: [],
                    options: [
                    ]

                },
               

                countries: {
                    name: 'Countries',
                    valueProp: 'DropdownID',
                    displayProp: 'DisplayText',
                    containerClass: 'multiSelect',
                    selectedOptions: [],
                    options: [
                    ]

                },
               
                cities: {
                    name: 'City',
                    valueProp: 'city_name',
                    displayProp: 'city_name',
                    containerClass: 'multiSelect',
                    selectedOptions: [],
                    options: [
                    ]
                },
                extensionVersion: {
                    name: 'Devices',
                    valueProp: 'Value',
                    displayProp: 'DisplayText',
                    containerClass: 'multiSelect',
                    selectedOptions: [],
                    options: [
                    ]
                },
                internetProviders: {
                    name: 'Internet Provider',
                    valueProp: 'Value',
                    displayProp: 'DisplayText',
                    containerClass: 'multiSelect',
                    selectedOptions: [],
                    options: [
                    ]
                }
            };

            vm.segmentSaved = function () {
                WizardHandler.wizard().next();
            };

            $scope.$watch("vm.form.segment.countries.selectedOptions", function (newval, oldval) {
                if (newval.length == 1) {
                     $cookies.put('timezone',newval[0].Value);
                    $rootScope.timezone=newval[0].Value;
                    _getCitiesByCountryId(newval[0].DropdownID)
                }
                else
                {
                     $rootScope.timezone="Europe/Zurich";
                     $cookies.put('timezone',"Europe/Zurich");
                }
            })
            var _getCitiesByCountryId = function (countryId) {

              campaignSrvc.getCitiesByCountryId(countryId).then(function (response) {
                //     vm.form.segment.cities.options = response.data.Records.map(function (record) {
                //         record.DisplayText = record.city_name
                //         return record;
                //     })
                    if (response.data.Result === "Success") {
                        vm.form.segment.cities.options = response.data.Records.map(function (record) {
                            record.DisplayText = record.city_name;
                            return record;
                        });
                    }
                    else {
                        vm.form.segment.cities.options = [];
                    }

                    if (cityDetail && cityDetail.length > 0 && cityDetail[0] !== "") {
                        vm.form.segment.city = true;
                        vm.form.segment.cities.selectedOptions = vm.form.segment.cities.options.filter(function (city) {
                            return cityDetail.includes(city.city_id.toString());
                        })
                    }

                })
            }
         
            var _getCountries = (function () {
                campaignSrvc.getCountriesTimeZones().then(function (response) {
                    vm.form.segment.countries.options = response.Records
                }).then(function (response) { })
            })()

         
            var _getExtension = (function () {
                campaignSrvc.getExtension().then(function (response) {
                    vm.form.segment.extensionVersion.options = response.Records
                  //  vm.loadCampaign();
                }).then(function (response) {
                   //  vm.loadCampaign();
                     })
            })()

     var _getInternetProvider = (function () {
                masterSrvc.getInternetProviders().then(function (response) {
                    //  vm.loadCampaign();
                    vm.form.segment.internetProviders.options = response.Records
                });
                // }).then(function (response) { vm.loadCampaign(); })
            })();



            vm.form.summary = {};
            vm.form.confirmation = {};
            vm.b1 = function () {
                WizardHandler.wizard().next();
            };

            vm.b2 = function () {
                WizardHandler.wizard().next();
            };

            vm.b3 = function () {
                WizardHandler.wizard().next();
            };
            vm.b4 = function () {
                WizardHandler.wizard().next();
            };
            vm.WizardHandler = WizardHandler;

            if ($stateParams.id) {
                vm.campaignId = $stateParams.id;
                // vm.WizardHandler.wizard().next();
                //  WizardHandler.wizard().next();
                //  WizardHandler.wizard("abc").goTo(1);
                // wz-next
            }
            vm.loadCampaign = function () {

                //add new campaign 
                if (!$stateParams.id) {

                }

                //existing  without no param data
                else if ($stateParams.id) {
                    vm.form.segment.edit = true;
                    if ($stateParams.step == 2) {
                        vm.form.segment.view = true;
                    }
                    vm.form.segment.saved = true;
                    campaignSrvc.getCampaignById({ campaign_id: $stateParams.id }).then(function (response) {
                        if (response.data.Result === "Success") {
                            var _campaignDetail = response.data.Record;
                            vm.form.segment.name = _campaignDetail.campaign_name;
                            vm.form.segment.typeId = _campaignDetail.campaign_type_id;
                            vm.form.segment.campignStartDate = _campaignDetail.campaign_start_date;
                            vm.form.segment.campignEndDate = _campaignDetail.campaign_end_date;

                             if (vm.form.segment.typeId === 3 ) {
                                vm.form.notification.headline = _campaignDetail.notification.title;
                                vm.form.notification.textdescription = _campaignDetail.notification.description;
                                vm.form.notification.selectedImage = _campaignDetail.notification.imagePath;
                                vm.form.notification.url = _campaignDetail.notification.forwardUrl;

                            }

                            var _installedDetail = _campaignDetail.installform.split(',')
                            if (_installedDetail.length > 0 && _installedDetail[0] != "") {
                                vm.form.segment.installed = true;
                                vm.form.segment.installedStartDate = _installedDetail[0]
                                vm.form.segment.installedEndDate = _installedDetail[1]
                            }

                            var _notclickedDetail = _campaignDetail.notClick.split(',')
                            if (_notclickedDetail.length > 0 && _notclickedDetail[0] != "") {
                                vm.form.segment.notClicked = true;
                                vm.form.segment.notClickedStartDate = _notclickedDetail[0]
                                vm.form.segment.notClickedEndDate = _notclickedDetail[1]
                            }
                            var _accessWebsiteDateDetail = _campaignDetail.accesswebsites_date.split(',')
                            if (_accessWebsiteDateDetail.length > 0 && _accessWebsiteDateDetail[0] != "") {
                                vm.form.segment.accessWebsite = true;
                                vm.form.segment.accessedWebsiteStartDate = _accessWebsiteDateDetail[0]
                                vm.form.segment.accessedWebsiteEndDate = _accessWebsiteDateDetail[1]
                            }
                            var _accessWebsiteDetail = _campaignDetail.accesswebsites.split(',')
                            if (_accessWebsiteDetail.length > 0 && _accessWebsiteDetail[0] != "") {
                                vm.form.segment.accessWebsite = true;
                                $timeout(function () {
                                vm.form.segment.urls = vm.form.segment.websites.filter(function (url) {
                                    return _accessWebsiteDetail.includes(url.Value)
                                })
                                 }, 0);
                            }

                            var countriesDetail = _campaignDetail.countries.split(',')
                            if (countriesDetail.length > 0 && countriesDetail[0] != "") {
                                vm.form.segment.country = true;
                                vm.form.segment.countries.selectedOptions = vm.form.segment.countries.options.filter(function (country) {
                                    return countriesDetail.includes(country.DropdownID.toString());
                                })
                            }

                             var internetProviderDetail = _campaignDetail.isps.split(',');
                            if (internetProviderDetail.length > 0 && internetProviderDetail[0] != "") {
                                vm.form.segment.internetProvider = true;
                                vm.form.segment.internetProviders.selectedOptions = vm.form.segment.internetProviders.options.filter(function (country) {
                                    return internetProviderDetail.includes(country.Value)
                                })
                                // if (vm.form.segment.countries.selectedOptions.length === 1)
                                //     _getCitiesByCountryId(vm.form.segment.countries.selectedOptions[0].Value);
                            }

                            var productsDetail = _campaignDetail.products.split(',')
                            if (productsDetail.length > 0 && productsDetail[0] != "") {
                                vm.form.segment.product = true;
                                vm.form.segment.products.selectedOptions = vm.form.segment.products.options.filter(function (product) {
                                    return productsDetail.includes(product.Value)
                                })

                            }


                            cityDetail = _campaignDetail.cities.split(',');
                            if (cityDetail.length > 0 && cityDetail[0] !== "") {
                                vm.form.segment.city = true;
                                vm.form.segment.cities.selectedOptions = vm.form.segment.cities.options.filter(function (city) {
                                    return cityDetail.includes(city.city_id.toString());
                                })
                            }

                            var browsersDetail = _campaignDetail.browsers.split(',')
                            if (browsersDetail.length > 0 && browsersDetail[0] != "") {
                                vm.form.segment.browser = true;
                                vm.form.segment.browsers.selectedOptions = vm.form.segment.browsers.options.filter(function (browser) {
                                    return browsersDetail.includes(browser.Value)
                                })
                            }
                            var extensionVersionsDetail = _campaignDetail.extensionversions.split(',')
                            if (extensionVersionsDetail.length > 0 && extensionVersionsDetail[0] != "") {
                                vm.form.segment.version = true;
                                vm.form.segment.extensionVersion.selectedOptions = vm.form.segment.extensionVersion.options.filter(function (version) {
                                    return extensionVersionsDetail.includes(version.Value)
                                })
                            }

                            if (vm.form.segment.timezones.options.length > 0) {

                                var obj = vm.form.segment.timezones.options.filter(function (item) {
                                    return (item.Value === _campaignDetail.timezone_id.toString());

                                });
                                vm.form.segment.timezones.selectedOption = obj[0];// _campaignDetail.timezone_id;
                                // vm.form.segment.timezones.selectedOption = _campaignDetail.timezone_id;
                            }

                            vm.form.segment.count = _campaignDetail.eligiblecount;
                        }

                    }, function (response) {
                    })
                }

            };

              $timeout(function () {
                vm.loadCampaign();

            }, 0);


        }],

        controllerAs: 'vm'
    });
})();