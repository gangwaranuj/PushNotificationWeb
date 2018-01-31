(function () {
    var app = angular.module('app');
    app.component('notification', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/campaign/create/notification/notification.html',
        controller: ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', '$cookies', '$rootScope', 'campaignSrvc', 'utilitySrvc', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', 'emoji', function ($scope, $uibModal, WizardHandler, masterSrvc, $location, $cookies, $rootScope, campaignSrvc, utilitySrvc, $stateParams, $q, $timeout, $cookieStore, message, emoji) {
            var vm = this;
            //Valialbe declaration
            vm.currentRoute = $location.path();
            vm.isOnDemand = $location.path().indexOf('ondemand') !== -1 ? false : true;
            vm.mindate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD'));
            vm.maxdate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD'));
            vm.start = "start";
            vm.end = "end";
            var cityDetail;
            var internetProviderDetail;
            var segmentDetail;
            var segmentTypesDetail;
            vm.type = "All";
            vm.uploadedimage = [];
            vm.uploadedBaner = [];
            vm.imgClass = "active";
            vm.updImgClass = "inActive";
            vm.isSelectImage = true;
            vm.isuploadImage = false;
            vm.isSegmented = false;
            vm.isAllSubscriber = true;
            vm.clsAllSubscriber = "btn btn-primary active";
            vm.clsSegments = "btn btn-primary";
            vm.selectedImage = "images/preview-icon.png";
            vm.isSub = false;
            vm.isCampignStartDate = false;
            vm.isCampignEndDate = false;
            vm.msgType = "";
            vm.count = 0;
            vm.segmentParamsHasChanged = false;
            window.emojiPicker.discover();
            vm.requireInteraction = false;
            var userCookiedData = {};

            vm.imagePaths = [
                { custom: 'images/png/car.png', thumbnail: 'images/png/car.png' },
                { custom: 'images/png/cup.png', thumbnail: 'images/png/cup.png' },
                { custom: 'images/png/diamond.png', thumbnail: 'images/png/diamond.png' },
                { custom: 'images/png/plan.png', thumbnail: 'images/png/plan.png' },
                { custom: 'images/png/pil.png', thumbnail: 'images/png/pil.png' },
                { custom: 'images/png/globe.png', thumbnail: 'images/png/globe.png' },
                { custom: 'images/png/iopush-gift.png', thumbnail: 'images/png/iopush-gift.png' }
            ];
            vm.preImages1 = [
                { imageSrc: 'images/png/car.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/cup.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/diamond.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/plan.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/pil.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/globe.png', imgtype: 'pre', selected: false },
                { imageSrc: 'images/png/iopush-gift.png', imgtype: 'pre', selected: false }
            ];
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
            function toUTF16(codePoint) {
                var TEN_BITS = parseInt('1111111111', 2);
                function u(codeUnit) {
                    return '\\u' + codeUnit.toString(16).toUpperCase();
                }
                if (codePoint <= 0xFFFF) {
                    return u(codePoint);
                }
                codePoint -= 0x10000;

                // Shift right to get to most significant 10 bits
                var leadSurrogate = 0xD800 + (codePoint >> 10);

                // Mask to get least significant 10 bits
                var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

                return u(leadSurrogate) + u(tailSurrogate);

            }

            vm.checkIfExist = function () {
                var campaingId = 0;
                if ($stateParams.id) {
                    campaingId = $stateParams.id;
                }
                vm.saving = true;
                vm.launching = true;
                campaignSrvc.checkIfExist({
                    campaign_name: vm.campaignName,
                    campaign_id: campaingId
                }).then(function (response) {
                    vm.saving = false;
                    vm.launching = false;
                    if (response.data.responseCode !== 200) {
                        vm.messageBox(message.createCampaign.campaignNameExists.formatstring(vm.campaignName));
                        return;
                    }
                }, function (response) {
                });
            };
            vm.platforms1 = {
                name: 'Select platforms',
                valueProp: 'DropdownID',
                displayProp: 'Value',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };
            vm.countries = {
                name: 'Select countries',
                valueProp: 'DropdownID',
                displayProp: 'DisplayText',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };

            vm.segmentTypes = {
                name: 'Segment type',
                valueProp: 'Value',
                displayProp: 'DisplayText',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };

            vm.segments = {
                name: 'Segment name',
                valueProp: 'Value',
                displayProp: 'DisplayText',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };


            vm.cities = {
                name: 'Select cities',
                valueProp: 'DropdownID',
                displayProp: 'DisplayText',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };
            vm.internetProviders = {
                name: 'Select internet service providers',
                valueProp: 'Value',
                displayProp: 'DisplayText',
                containerClass: 'multiSelect',
                selectedOptions: [],
                options: [
                ]
            };
            if ($cookies) {
                userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                if (userCookiedData) {
                    vm.productURL = userCookiedData.websiteUrl;
                }
            }

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


            $scope.$watch("vm.subscribedStartDate", function (newval, oldval) {
                if (!newval || newval === "") {
                    vm.isSub = false;
                }
                else {
                    vm.isSub = true;
                }
            });


            $scope.$watch("vm.campignEndDate", function (newval, oldval) {
                if (!newval || newval === "") {
                    vm.isCampignEndDate = false;
                }
                else {
                    vm.isCampignEndDate = true;
                }
            });


            $scope.$watch("vm.campignStartDate", function (newval, oldval) {
                if (!newval || newval === "") {
                    vm.isCampignStartDate = false;
                }
                else {
                    vm.isCampignStartDate = true;
                }
            });


            var _getCitiesByCountryId = function (countryId) {

                campaignSrvc.getCitiesByCountryId(countryId).then(function (response) {
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

                    vm.platforms1.options = response.Records;
                }).then(function (response) { })
            })();

            var _getSegmentTypes = (function () {
                masterSrvc.getSegmentTypes().then(function (response) {

                    vm.segmentTypes.options = response.Records;
                }).then(function (response) { })
            })();


            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            vm.allSubscribers = function () {
                vm.type = "All";
                vm.isAllSubscriber = true;
                vm.isSegmented = false;
                vm.clsAllSubscriber = "btn btn-primary active";
                vm.clsSegments = "btn btn-primary";
            };
            vm.segmented = function () {
                vm.type = "Seg";
                vm.isSegmented = true;
                vm.isAllSubscriber = false;
                vm.clsSegments = "btn btn-primary active";
                vm.clsAllSubscriber = "btn btn-primary";
            };


            vm.getUserCount = function () {

                if (vm.isSegmented) {
                    vm.count = 0;
                    if (vm.countries.selectedOptions.length < 1 && vm.cities.selectedOptions.length < 1 && vm.internetProviders.selectedOptions.length < 1 && vm.platforms1.selectedOptions.length < 1 && vm.segmentTypes.selectedOptions.length < 1 && vm.segments.selectedOptions.length < 1 && (vm.subscribedStartDate === undefined || vm.subscribedStartDate === "")) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.selectSegment);
                        return validationPass;

                    }
                    var _data = {};

                    if (vm.subscribedStartDate && vm.subscribedStartDate !== "") {
                        _data.subscribedFrom = formatDate(vm.subscribedStartDate);
                    }
                    else {
                        _data.subscribedFrom = "";
                    }

                    if (vm.internetProviders) {
                        var internetProviderValues = vm.internetProviders.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.ispId = internetProviderValues.length > 1 ?
                            internetProviderValues.join(',') : internetProviderValues.toString();
                    }

                    if (vm.platforms1) {
                        var browsersValues = vm.platforms1.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.browsers = browsersValues.length > 1 ?
                            browsersValues.join(',') : browsersValues.toString()
                    }

                    if (vm.countries) {
                        var countriesValues = vm.countries.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.countries = countriesValues.length > 1 ?
                            countriesValues.join(',') : countriesValues.toString();
                    }

                    if (vm.segmentTypes) {
                        var segmentTypesValues = vm.segmentTypes.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.segmentTypes = segmentTypesValues.length > 1 ?
                            segmentTypesValues.join(',') : segmentTypesValues.toString();
                    }

                    if (vm.segments) {
                        var segmentsValues = vm.segments.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.segments = segmentsValues.length > 1 ?
                            segmentsValues.join(',') : segmentsValues.toString();
                    }


                    if (vm.countries.length = 1 && vm.cities) {
                        var citiesValues = vm.cities.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.cities = citiesValues.length > 1 ?
                            citiesValues.join(',') : citiesValues.toString();
                    }

                    if ((!_data.browsers) && (!_data.countries) && (!_data.cities) && (!_data.ispId) && (!_data.subscribedFrom) && (!_data.segmentTypes) && (!_data.getSegments)) {
                        vm.messageBox(message.createCampaign.segmentParamNotExist);
                        return;
                    }
                    campaignSrvc.getTotalCampaign(
                        {
                            'browserId': _data.browsers === undefined ? "" : _data.browsers,
                            'countryId': _data.countries === undefined ? "" : _data.countries,
                            'cities': _data.cities === undefined ? "" : _data.cities,
                            'ispId': _data.ispId === undefined ? "" : _data.ispId,
                            'subscribedFrom': _data.subscribedFrom === undefined ? "" : _data.subscribedFrom,
                            'segments': _data.segments === undefined ? "" : _data.segments,
                            'segmentTypes': _data.segmentTypes === undefined ? "" : _data.segmentTypes
                        }
                    ).then(function (response) {
                        if (response.data.Result === "Success") {
                            vm.calculateCount = true;
                            vm.segmentParamsHasChanged = false;
                            vm.count = response.data.TotalRecordCount;
                        }
                    }, function (response) {

                    });
                }
            };

            vm.launchConfirmationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/message.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', 'message', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage, message) {
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            //$cookies.put("aciveMenu", 1);
                            $state.go('iopush.auth.campaign');
                        };
                        var csscls = "";
                        if (vm.msgType === 's') {
                            csscls = "io-icon io-md-icon io-successful";
                        }
                        else if (vm.msgType === 'saved') {
                            csscls = "io-icon io-md-icon io-saved";
                        }
                        else {
                            csscls = "io-icon io-md-icon io-failled";
                        }
                        modalScope.confirmationMessage = { msg: confirmationMessage, css: csscls };

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

            vm.selectLargeImage = function () {
                if (!vm.isLargeImage) {
                    vm.bannerImage = "";
                }

            };

            function beforSave() {
                if (vm.campignStartDate && vm.campignStartDate !== '') {

                    if (!vm.campignEndDate || vm.campignEndDate === '') {

                        var endDateTime = new Date(vm.campignStartDate);// new Date()
                        endDateTime.setDate(endDateTime.getDate() + 28);
                        vm.campignEndDate = endDateTime;//vm.campignStartDate;
                    }
                }
                // var imageCodeTitle = [];
                // var imageCodeMessage = [];
                // var utfCodeArrayTitle = [];
                // var utfCodeArrayMessage = [];
                // var myElementsTitle = $("#title .emoji-wysiwyg-editor .img");
                // var myElementsMessage = $("#message .emoji-wysiwyg-editor .img");
                // var titleDiv = $("#title .emoji-wysiwyg-editor")[0].innerHTML;
                // var messageDiv = $("#message .emoji-wysiwyg-editor")[0].innerHTML;

                // for (var i = 0; i < myElementsTitle.length; i++) {
                //     var imageName = myElementsTitle.eq(i).attr('alt');
                //     imageCodeTitle.push(imageName.split(':')[1]);
                // }
                // for (var i = 0; i < imageCodeTitle.length; i++) {
                //     for (key in Config.emoji_data) {
                //         if (Config.emoji_data[key][3][0] == imageCodeTitle[i]) {
                //             utfCodeArrayTitle.push(toUTF16(Config.emoji_data[key][0][0].codePointAt(0)));
                //         }
                //     }
                // }
                // for (var i = 0; i < utfCodeArrayTitle.length; i++) {
                //     titleDiv = titleDiv.replace(/<\/?span[^>]*>/g, "");
                //     vm.headline = vm.headline.replace(
                //         /(<img("[^"]*"|[^\/">])*)>/gi,
                //         function (whole, group1) {
                //             return utfCodeArrayTitle[i];
                //         }
                //     );
                // }
                // for (var i = 0; i < myElementsMessage.length; i++) {
                //     var imageName = myElementsMessage.eq(i).attr('alt');
                //     imageCodeMessage.push(imageName.split(':')[1]);
                // }
                // for (var i = 0; i < imageCodeMessage.length; i++) {
                //     for (key in Config.emoji_data) {
                //         if (Config.emoji_data[key][3][0] == imageCodeMessage[i]) {
                //             utfCodeArrayMessage.push(toUTF16(Config.emoji_data[key][0][0].codePointAt(0)));
                //         }
                //     }
                // }
                // for (var i = 0; i < utfCodeArrayMessage.length; i++) {
                //     messageDiv = messageDiv.replace(/<\/?span[^>]*>/g, "");
                //     vm.textdescription = vm.textdescription.replace(
                //         /(<img("[^"]*"|[^\/">])*)>/gi,
                //         function (whole, group1) {
                //             return utfCodeArrayMessage[i];
                //         }
                //     );
                // }

                convertImgToDataURLviaCanvas(vm.selectedImage, function (data) {

                    $timeout(function () {
                        vm.selectedImage = data;
                    }, 0);
                });

                convertImgToDataURLviaCanvas(vm.bannerImage, function (data) {
                    $timeout(function () {
                        vm.bannerImage = data;
                    }, 0);
                });

                var _data = {
                    campaign_name: vm.campaignName,
                    campaign_schedule_date: vm.campignStartDate && vm.campignStartDate !== '' ? utilitySrvc.getDateFormat(vm.campignStartDate) : "",
                    campaign_end_date: vm.campignEndDate && vm.campignEndDate !== '' ? utilitySrvc.getDateFormat(vm.campignEndDate) : "",
                    campaign_current_date: utilitySrvc.getDateFormat(new Date()),
                    forwardUrl: vm.url,
                    title: vm.headline,
                    description: vm.textdescription,
                    file: vm.selectedImage,
                    source: vm.source,
                    generic: vm.generic,
                    campaign: vm.urlCampaign,
                    eligiblecount: vm.count,
                    requireInteraction: vm.requireInteraction,
                    largeImage: vm.isLargeImage,
                    bannerImage: vm.bannerImage

                };
                _data.platform = "";



                if (vm.type !== "All") {
                    _data.isSegmented = vm.isSegmented;// true;

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


                    if (vm.countries.selectedOptions.length === 1 && vm.cities.selectedOptions.length > 0) {
                        var citiesValues = vm.cities.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        })
                        _data.cities = citiesValues.length > 1 ?
                            citiesValues.join(',') : citiesValues.toString();
                    }





                    if (vm.subscribedStartDate && vm.subscribedStartDate !== "") {
                        _data.subscribed = utilitySrvc.getDateFormat(vm.subscribedStartDate);
                    }
                    else {
                        _data.subscribed = "";
                    }

                }
                else {
                    _data.isSegmented = false;
                    _data.isps = "";
                    _data.cities = "";
                    _data.countries = "";
                    _data.subscribed = "";
                    _data.segments = "";
                    _data.segmentTypes = "";
                }
                _data.timezone_id = 1;

                return _data;

            }
            vm.saveCampaign = function (isSendNotification) {
                var deferred = $q.defer();

                vm.saving = true;
                if (!validate()) { vm.saving = false; vm.launching = false; return; }
                var currentDate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));

                if (vm.campignStartDate && vm.campignStartDate !== '') {
                    if ((new Date(vm.campignStartDate)) < (currentDate)) {
                        vm.messageBox(message.createCampaign.startDateGreatherThanCurrentDate);
                        vm.saving = false;
                        return;
                    }
                }

                if (vm.campignEndDate && vm.campignStartDate !== '') {
                    if ((new Date(vm.campignEndDate)) < (currentDate)) {
                        vm.messageBox(message.createCampaign.campignEndDate);
                        vm.saving = false;
                        return;
                    }
                    if ((new Date(vm.campignEndDate)) < (new Date(vm.campignStartDate))) {
                        vm.messageBox(message.createCampaign.endDateLessThanStartDate);
                        vm.saving = false;
                        return;
                    }
                }

                if (vm.campignEndDate && vm.campignEndDate !== '' && vm.campignStartDate && vm.campignStartDate !== '') {
                    var minutes = Math.abs(new Date(vm.campignEndDate).getTime() - new Date(vm.campignStartDate).getTime()) / (60 * 1000);
                    if (minutes < 15) {
                        vm.messageBox(message.createCampaign.startEndDateDiff);
                        vm.saving = false;
                        return;
                    }
                }
                if (vm.campignStartDate && vm.campignStartDate !== '') {
                    if (!vm.campignEndDate || vm.campignEndDate === '') {
                        var endDateTime = new Date(vm.campignStartDate);// new Date()
                        endDateTime.setDate(endDateTime.getDate() + 28);
                        vm.campignEndDate = endDateTime;//vm.campignStartDate;
                    }
                }
                // if (vm.campignStartDate && vm.campignStartDate !== '') {
                //     currentDate.setMinutes(currentDate.getMinutes() + 15);
                //     if ((new Date(vm.campignStartDate)) > (currentDate)) {
                //         vm.pendingCampaign(false);
                //     }
                //     else {
                //         var promise;
                //         promise = vm.pendingCampaign(true);
                //         promise.then(function (result) {
                //             if (result === "Failed") {
                //                 vm.launching = false;
                //                 return;
                //             }
                //             if (vm.campaign_id) {
                //                 campaignSrvc.launchCampaign({ "campaign_id": vm.campaign_id }).then(function (response) {
                //                     if (response.data.responseCode !== 200) {
                //                         vm.saving = false;
                //                         vm.messageBox(response.data.responseDescription);
                //                         return;
                //                     }
                //                     else {
                //                         vm.msgType = "s";
                //                         vm.launchConfirmationMessage(message.createCampaign.campaignLaunchedMessage);
                //                     }
                //                     vm.saving = false;
                //                 }, function () {
                //                     vm.saving = false;
                //                     return;
                //                 });
                //             }
                //         });
                //     }
                // }
                // else {
                var _data = beforSave();
                _data.file = vm.selectedImage;

                if ($stateParams.id || vm.campaign_id) {
                    var id = $stateParams.id;
                    vm.campaign_id = $stateParams.id ? $stateParams.id : vm.campaign_id;
                    _data.campaign_id = $stateParams.id ? $stateParams.id : vm.campaign_id;

                    // if (vm.campignStartDate && vm.campignStartDate !== '') {
                    // }
                    // else {
                    campaignSrvc.updateDraftCampaign(_data).then(function (response) {
                        if (response.data.Result === "Success") {
                            vm.saving = false;
                            deferred.resolve("Success");
                            if (!isSendNotification) {
                                vm.msgType = "saved";
                                vm.launchConfirmationMessage(message.createCampaign.campaignSavedMessage);
                            }
                        }
                        else {
                            deferred.resolve("Failed");
                            vm.msgType = "f";
                            vm.saved = true;
                            vm.saving = false;
                            vm.messageBox(message.createCampaign.draftCampaignFailure);
                        }
                    }, function () {
                    });
                    //  }


                }
                else {
                    campaignSrvc.draftCampaign(_data).then(function (response) {

                        if (response.data.Result == "Success") {
                            vm.saved = true;
                            vm.savedOnly = true;
                            vm.saving = false;
                            vm.campaign_id = response.data.Record.campaign_id;
                            deferred.resolve("Success");

                            if (!isSendNotification) {
                                vm.msgType = "saved";
                                vm.launchConfirmationMessage(message.createCampaign.campaignSavedMessage);
                            }
                        }
                        else {
                            deferred.resolve("Failed");
                            vm.saving = false;
                            vm.messageBox(message.createCampaign.draftCampaignFailure, 'f');
                            return;
                        }
                    }, function (response) {
                    })
                }
                return deferred.promise;
                //}
            };
            
            vm.isSub = false;
            vm.deleteCampignEndDate = function () {
                vm.campignEndDate = "";
            };
            vm.deleteCampignStartDate = function () {
                vm.campignStartDate = "";
                vm.campignEndDate = "";
            };

            vm.deleteSubDate = function () {
                vm.subscribedStartDate = "";
            };
            vm.pendingCampaign = function (isSendNotification) {
                var deferred = $q.defer();
                vm.saving = true;
                var _data = beforSave();
                _data.file = vm.selectedImage;
                if ($stateParams.id || vm.campaign_id) {
                    var id = $stateParams.id;
                    vm.campaign_id = $stateParams.id ? $stateParams.id : vm.campaign_id;
                    _data.campaign_id = $stateParams.id ? $stateParams.id : vm.campaign_id;
                    campaignSrvc.updatePendingCampaign(_data).then(function (response) {
                        if (response.data.Result === "Success") {
                            vm.saving = false;
                            deferred.resolve("Success");
                            if (!isSendNotification) {
                                vm.msgType = "saved";
                                vm.launchConfirmationMessage(message.createCampaign.campaignSavedMessage);
                            }
                        }
                        else {
                            deferred.resolve("Failed");
                            vm.msgType = "f";
                            vm.saved = true;
                            vm.saving = false;
                            vm.messageBox(message.createCampaign.updatePendingCampaignFailure);
                        }
                    }, function () {

                    });
                }
                else {
                    campaignSrvc.pendingCampaign(_data).then(function (response) {
                        if (response.data.Result == "Success") {
                            vm.saved = true;
                            vm.savedOnly = true;
                            vm.saving = false;
                            vm.campaign_id = response.data.Record.campaign_id;
                            deferred.resolve("Success");
                            if (!isSendNotification) {
                                vm.msgType = "saved";
                                vm.launchConfirmationMessage(message.createCampaign.campaignSavedMessage);
                            }
                        }
                        else {
                            deferred.resolve("Failed");
                            vm.saving = false;
                            vm.messageBox(message.createCampaign.pendingCampaignFailure, 'f');
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
                if (!validate()) { vm.saving = false; vm.launching = false; return; }
                if (!validateCampaignDate()) { vm.saving = false; vm.launching = false; return; }

                promise = vm.pendingCampaign(isSendNotification);
                promise.then(function (result) {
                    if (result === "Failed") {
                        vm.launching = false;
                        return;
                    }
                    if ($stateParams.id) {
                        vm.campaign_id = $stateParams.id;
                    }
                    var currentDateTime = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));// new Date()
                    currentDateTime.setMinutes(currentDateTime.getMinutes() + 15);
                    var dt = vm.campignStartDate;
                    if ((new Date(vm.campignStartDate)) > (currentDateTime)) {
                        vm.launching = false
                        vm.msgType = "s";
                        vm.launchConfirmationMessage('Notification will be sent on ' + utilitySrvc.getDate(dt));

                    }
                    else if ((new Date(vm.campignEndDate)) < (currentDateTime)) {
                        vm.msgType = "s";
                        vm.launchConfirmationMessage(message.createCampaign.campaignExpireMessage);
                        vm.launching = false;
                        campaignSrvc.expirecampaign({ "campaign_id": vm.campaign_id });

                    }
                    else {
                        campaignSrvc.launchCampaign({ "campaign_id": vm.campaign_id }).then(function (response) {
                            if (response.data.responseCode === 206) {
                                validationPass = false;
                                vm.launching = false;
                                vm.messageBox(message.createCampaign.campaignLaunchedFailureMessage);
                                return;
                            }
                            else if (response.data.responseCode === 200) {
                                vm.msgType = "s";
                                vm.launchConfirmationMessage(message.createCampaign.campaignLaunchedMessage);
                            }
                            else {
                                validationPass = false;
                                vm.launching = false;
                                vm.messageBox(message.error.internalError);
                                return;

                            }
                            vm.launching = false;
                        }, function () {
                            validationPass = false;
                            vm.launching = false;
                            return;
                        });
                    }

                }, function (error) {
                    vm.launching = false;
                });

            };

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


            $scope.$watchGroup(['vm.internetProviders.selectedOptions', 'vm.platforms1.selectedOptions',
                'vm.cities.selectedOptions', 'vm.countries.selectedOptions', 'vm.subscribedStartDate', 'vm.segmentTypes.selectedOptions', 'vm.segments.selectedOptions'
            ], function (newval, oldval) {
                vm.segmentParamsHasChanged = true;
            })

            function isUrlValid(userInput) {
                var regexQuery = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
                var url = new RegExp(regexQuery, "i");
                if (url.test(userInput)) {
                    return true;
                }
                return false;
            }

            function validateCampaignDate() {
                var validationPass = true;
                var currentDate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));

                if (!vm.campignStartDate || vm.campignStartDate === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.startDateRequire);
                    return validationPass;
                }
                else if ((new Date(vm.campignStartDate)) < (currentDate)) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.startDateGreatherThanCurrentDate);
                    return validationPass;

                }

                if (vm.campignEndDate && vm.campignEndDate === '') {

                    if ((new Date(vm.campignEndDate)) < (currentDate)) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.campignEndDate);
                        return validationPass;

                    }
                    if ((new Date(vm.campignEndDate)) < (new Date(vm.campignStartDate))) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.endDateLessThanStartDate);
                        return validationPass;

                    }
                }

                if (vm.campignEndDate && vm.campignEndDate !== '' && vm.campignStartDate && vm.campignStartDate !== '') {


                    if ((new Date(vm.campignEndDate)) < (new Date(vm.campignStartDate))) {
                        vm.messageBox(message.createCampaign.endDateLessThanStartDate);
                        validationPass = false;
                        return validationPass;
                    }

                    var minutes = Math.abs(new Date(vm.campignEndDate).getTime() - new Date(vm.campignStartDate).getTime()) / (60 * 1000);
                    if (minutes < 15) {
                        vm.messageBox(message.createCampaign.startEndDateDiff);
                        validationPass = false;
                        return;
                    }
                }
                return validationPass;

            }
            function validate() {
                var validationPass = true;
                var currentDate = new Date();
                var currentDate = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));

                var regax = /^[a-z0-9_]+$/i;
                if (!(vm.campaignName) || vm.campaignName === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.campaignNameRequire);
                    return validationPass;
                }
                else if (vm.campaignName.length > 50) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.campaignNameLength);
                    return validationPass;
                }


                else if (!regax.test(vm.campaignName)) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.campaignNameFormant);
                    return validationPass;
                }

                else if (!vm.selectedImage || (vm.selectedImage === "images/preview-icon.png")) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.imageRequire);
                    return validationPass;
                }

                else if ((!vm.headline) || vm.headline === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.headlineRequire);
                    return validationPass;

                }

                else if (vm.headline.length > 48) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.headlineLength);
                    return validationPass;
                }
                else if ((!vm.textdescription) || vm.textdescription === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.DescriptionRequire);
                    return validationPass;

                }
                else if (vm.textdescription.length > 100) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.DescriptionLengh);
                    return validationPass;
                }
                else if ((!vm.url) || vm.url === '') {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.urlRequire);
                    return validationPass;

                }
                else if (vm.url.length > 200) {
                    validationPass = false;
                    vm.messageBox(message.createCampaign.urlLenght);
                    return validationPass;
                }
                else if (vm.url !== '') {
                    if (!isUrlValid(vm.url)) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.urlFormat);
                        return validationPass;
                    }
                }


                if (vm.isLargeImage) {
                    if (!vm.bannerImage || (vm.bannerImage === "images/preview-icon.png")) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.imageRequire);
                        return validationPass;
                    }
                }




                if (vm.isSegmented) {
                    if (vm.countries.selectedOptions.length < 1 && vm.cities.selectedOptions.length < 1 && vm.internetProviders.selectedOptions.length < 1 && vm.platforms1.selectedOptions.length < 1 && vm.subscribedStartDate === undefined && vm.segmentTypes.selectedOptions.length < 1 && vm.segments.selectedOptions.length < 1) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.selectSegment);
                        return validationPass;
                    }
                }

                if (vm.type == "Seg") {
                    if (vm.count < 1) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.calMatchingUsers);
                        return validationPass;
                    }
                    if (vm.segmentParamsHasChanged) {
                        validationPass = false;
                        vm.messageBox(message.createCampaign.calMatchingUsers);
                        return validationPass;
                    }
                }

                return validationPass;

            }

            vm.preview = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/components/campaign/viewnewsfeed/viewnewsfeed.html',

                    controller: function ($scope, $uibModalInstance) {
                        $scope.render = true;
                        $scope.title = vm.headline;
                        $scope.description = vm.textdescription;
                        $scope.imageSrc = vm.selectedImage ? vm.selectedImage : "images/preview-icon.png";
                        $scope.url = vm.url
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs: 'vm'
                });
            };

            function getCurrentDateTime() {
                var d = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss')),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [day, month, year].join('/') + ' ' + d.getHours() + ':' + d.getMinutes();// d.setMinutes(d.getMinutes() + 5); d.getMinutes();
            }

            if (!$cookies.get('timezone')) {
                $cookies.put('timezone', "Europe/Zurich");
            }


            $('#dateTimePicker1').daterangepicker({
                timePicker24Hour: true,
                timePicker: true,
                timePickerIncrement: 1,
                locale: {
                    // format: 'MM/DD/YYYY h:mm'
                    format: 'DD/MM/YYYY h:mm'
                },
                minDate: getCurrentDateTime(),
                drops: 'up',
                opens: 'left'

            });
            $('.fa-clock-o').css('display', 'none');
            $('.daterangepicker_input .input-mini').css('display', 'none');
            $('.fa-calendar').css('display', 'none');
            $('.daterangepicker_input').css({ 'position': 'absolute', 'bottom': 0 });
            $('.calendar').css('padding-bottom', '30px')
            $('#dateTimePicker1').on('apply.daterangepicker', function (ev, picker) {
                $('#showDate').val(picker.startDate.format('MM/DD/YYYY h:mm') + ' - ' + picker.endDate.format('MM/DD/YYYY h:mm'));
                vm.ampaign_schedule_date = picker.startDate.format('DD/MM/YYYY h:mm');
            });


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
                    campaignSrvc.getCampaignById({ campaign_id: $stateParams.id }).then(function (response) {
                        if (response.data.Result === "Success") {
                            var _campaignDetail = response.data.Record;
                            vm.campaignName = _campaignDetail.campaign_name;
                            vm.url = _campaignDetail.forwardUrl;
                            vm.headline = _campaignDetail.title;
                            vm.textdescription = _campaignDetail.description;
                            vm.count = _campaignDetail.eligiblecount;
                            vm.isPending = _campaignDetail.campaign_status === 2 ? true : false;
                            vm.source = _campaignDetail.source;
                            vm.generic = _campaignDetail.generic;
                            vm.urlCampaign = _campaignDetail.campaign;
                            vm.requireInteraction = _campaignDetail.requireInteraction;
                            // vm.subscribedStartDate = _campaignDetail.subscribed;
                            vm.headline = vm.headline.replace(
                                /\\u([\d\w]{4})/gi,
                                function (whole, group1) {
                                    return String.fromCharCode(parseInt(group1, 16));
                                }
                            );
                            vm.textdescription = vm.textdescription.replace(
                                /\\u([\d\w]{4})/gi,
                                function (whole, group1) {
                                    return String.fromCharCode(parseInt(group1, 16));
                                }
                            );
                            var titleDiv = $("#title .emoji-wysiwyg-editor")[0];
                            var messageDiv = $("#message .emoji-wysiwyg-editor")[0];
                            if (titleDiv)
                                titleDiv.innerHTML = EmojiPicker.prototype.unicodeToImage(vm.headline);
                            if (messageDiv)
                                messageDiv.innerHTML = EmojiPicker.prototype.unicodeToImage(vm.textdescription);
                            if (_campaignDetail.subscribed && _campaignDetail.subscribed !== "NaN-NaN-NaNTNaN:NaN:NaN") {
                                vm.subscribedStartDate = _campaignDetail.subscribed;
                            }
                            vm.campignStartDate = _campaignDetail.campaign_schedule_date;
                            vm.campignEndDate = _campaignDetail.campaign_end_date;
                            vm.isSegmented = _campaignDetail.isSegmented;
                            vm.isLargeImage = _campaignDetail.largeImage;


                            convertImgToDataURLviaCanvas(_campaignDetail.bannerImage, function (data) {
                                $timeout(function () {
                                    vm.bannerImage = data;
                                }, 0);
                            });

                            convertImgToDataURLviaCanvas(_campaignDetail.imagePath, function (data) {
                                $timeout(function () {
                                    vm.selectedImage = data;
                                }, 0);

                            });

                            if (vm.isSegmented) {
                                vm.type = "Seg";
                            }
                            else {
                                vm.type = "All";
                            }
                            if (_campaignDetail.isSegmented) {
                                vm.clsAllSubscriber = "btn btn-primary";
                                vm.clsSegments = "btn btn-primary active";
                                vm.isAllSubscriber = false;
                            }
                            else {
                                vm.clsAllSubscriber = "btn btn-primary active";
                                vm.clsSegments = "btn btn-primary";
                                vm.isAllSubscriber = true;
                            }
                            vm.uploadedimage.push({
                                imageSrc: _campaignDetail.imagePath,
                                imgtype: 'custom'
                            });

                            if (vm.isLargeImage) {

                                vm.uploadedBaner.push({
                                    imageSrc: _campaignDetail.bannerImage,
                                    imgtype: 'custom'
                                });
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
                                })
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

        }],

        controllerAs: 'vm'
    });
})();