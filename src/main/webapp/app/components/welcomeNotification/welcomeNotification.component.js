(function () {
    var app = angular.module('app');
    app.component('welcomeNotification', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/welcomeNotification/welcomeNotification.html',
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
            vm.type = "All";
            vm.uploadedimage = [];
            vm.uploadedBaner = [];
            vm.imgClass = "active";
            vm.updImgClass = "inActive";
            vm.isSelectImage = true;
            vm.isuploadImage = false;
            vm.segmented = false;
            vm.isAllSubscriber = true;
            vm.clsAllSubscriber = "btn btn-primary active";
            vm.clsSegments = "btn btn-primary";
            vm.selectedImage = "images/preview-icon.png";
            vm.bannerImage = "images/preview-icon.png";
            vm.isSub = false;
            vm.msgType = "";
            vm.clsOnMessage = "btn btn-primary active";
            vm.clsOffMessage = "btn btn-primary";
            vm.messageStatus = "WELCOME NOTIFICATIONS IS ON";
            vm.segmentParamsHasChanged = false;
            vm.msgOff = false;
            vm.messageOn = {};
            vm.messageOff = {};
            vm.messageOn.active = true;
            vm.duration = "unlimited";
            window.emojiPicker.discover();
            var userCookiedData = {};
             vm.cssDuration="wel-strt-date readonly";


            vm.imagePaths = [
                { custom: 'images/png/car.png', thumbnail: 'images/png/car.png' },
                { custom: 'images/png/cup.png', thumbnail: 'images/png/cup.png' },
                { custom: 'images/png/diamond.png', thumbnail: 'images/png/diamond.png' },
                { custom: 'images/png/plan.png', thumbnail: 'images/png/plan.png' },
                { custom: 'images/png/pil.png', thumbnail: 'images/png/pil.png' },
                { custom: 'images/png/globe.png', thumbnail: 'images/png/globe.png' },
                { custom: 'images/png/iopush-gift.png', thumbnail: 'images/png/iopush-gift.png' }
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
                name: 'Cities',
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

                    $rootScope.timezone = "Europe/Zurich";
                    $cookies.put('timezone', "Europe/Zurich");
                    vm.cities.options = [];
                    vm.cities.selectedOptions = [];
                    vm.internetProviders.options = [];
                    vm.internetProviders.selectedOptions = [];
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


            $scope.$watch("vm.endDate", function (newval, oldval) {
                if (!newval || newval === "") {
                    vm.isCampignEndDate = false;
                }
                else {
                    vm.isCampignEndDate = true;
                }
            });

            $scope.$watch("vm.startDate", function (newval, oldval) {
                if (!newval || newval === "") {
                    vm.isCampignStartDate = false;
                }
                else {
                    vm.isCampignStartDate = true;
                }
            });
            $scope.$watch("vm.duration", function (newval, oldval) {
                if (newval == "unlimited") {
                    vm.cssDuration="wel-strt-date readonly";
                    vm.startDate = "";
                    vm.endDate = "";
                }
                else
                {
                    vm.cssDuration="wel-strt-date";
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
                    // console.log("response",response);
                    vm.platforms1.options = response.Records;
                }).then(function (response) { })
            })();

            var _getSegmentTypes = (function () {
                masterSrvc.getSegmentTypes().then(function (response) {

                    vm.segmentTypes.options = response.Records;
                }).then(function (response) { })
            })();

            vm.onMessage = function () {
                vm.clsOnMessage = "btn btn-primary active";
                vm.clsOffMessage = "btn btn-primary";
                vm.messageStatus = "WELCOME NOTIFICATIONS IS ON";
                // vm.duration = "unlimited";
                vm.msgOff = false;
                vm.messageOn.active = true;

            };
            vm.offMessage = function () {
                vm.clsOffMessage = "btn btn-primary active";
                vm.clsOnMessage = "btn btn-primary";
                vm.messageStatus = "WELCOME NOTIFICATIONS IS OFF";
                //vm.duration = "specific";
                vm.msgOff = true;
                vm.messageOn.active = false;
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

            vm.allSubscribers = function () {
                vm.type = "All";
                vm.isAllSubscriber = true;
                vm.segmented = false;
                vm.clsAllSubscriber = "btn btn-primary active";
                vm.clsSegments = "btn btn-primary";

            };
            vm.segmentedCheck = function () {
                vm.type = "Seg";
                vm.segmented = true;
                vm.isAllSubscriber = false;
                vm.clsSegments = "btn btn-primary active";
                vm.clsAllSubscriber = "btn btn-primary";

            };


            vm.launchConfirmationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/message.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', 'message', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage, message) {
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            //$cookies.put("aciveMenu", 9);
                            $state.go('iopush.auth.manageWelcomeNotification');
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

            function beforSave() {

                var _segmentTypesValues;
                var _segmentsValues;

                if (vm.duration == "unlimited")
                    vm.unlimited = true;
                else if (vm.duration == "specific")
                    vm.unlimited = false;



                convertImgToDataURLviaCanvas(vm.bannerImage, function (data) {
                    $timeout(function () {
                        vm.bannerImage = data;
                    }, 0);
                });


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
                var _data = {
                    welcomeName: vm.welcomeName,
                    welcomeScheduleDate: vm.startDate && vm.startDate !== '' ? utilitySrvc.getDateFormat(vm.startDate) : "",
                    welcomeEndDate: vm.endDate && vm.endDate !== '' ? utilitySrvc.getDateFormat(vm.endDate) : "",
                    welcomeCurrentDate: utilitySrvc.getDateFormat(new Date()),
                    forwardUrl: vm.url,
                    title: vm.headline,
                    description: vm.textdescription,
                    imagePath: vm.selectedImage,
                    source: vm.source,
                    generic: vm.generic,
                    welcome: vm.urlWelcome,
                    unlimited: vm.unlimited,
                    active: vm.messageOn.active,
                    largeImage: vm.isLargeImage,
                    bannerImage: vm.bannerImage
                };


                _data.platform = "";
                _data.segmentSelected = "";
                if (vm.type !== "All") {
                    //do not change sequence of drop down checklist boxes
                    _data.segmented = vm.segmented;// true;

                    if (vm.countries.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat("true");
                        var _countryValues = vm.countries.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.countries = _countryValues.length > 1 ?
                            _countryValues.join(',') : _countryValues.toString();

                    }
                    else {
                        if (vm.countries.options.length > 0) {
                            _data.segmentSelected = _data.segmentSelected.concat("false");
                            var _countryValues = vm.countries.options.map(function (data) {
                                return data.DropdownID;
                            });
                            _data.countries = _countryValues.length > 1 ?
                                _countryValues.join(',') : _countryValues.toString();

                        }
                    }

                    if (vm.countries.selectedOptions.length === 1 && vm.cities.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat(",true");
                        var citiesValues = vm.cities.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        })
                        _data.cities = citiesValues.length > 1 ?
                            citiesValues.join(',') : citiesValues.toString();

                    }
                    else {
                        _data.segmentSelected = _data.segmentSelected.concat(",false");
                        if (vm.countries.selectedOptions.length === 1 && vm.cities.options.length > 0) {
                            var citiesValues = vm.cities.options.map(function (data) {
                                return data.DropdownID;
                            });
                            _data.cities = citiesValues.length > 1 ?
                                citiesValues.join(',') : citiesValues.toString();

                        }
                    }
                    if (vm.platforms1.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat(",true");
                        var _platforms = vm.platforms1.selectedOptions.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.platform = _platforms.length > 1 ?
                            _platforms.join(',') : _platforms.toString();

                    }
                    else {
                        if (vm.platforms1.options.length > 0) {
                            _data.segmentSelected = _data.segmentSelected.concat(",false");
                            var _platforms = vm.platforms1.options.map(function (data) {
                                return data.DropdownID;
                            });
                            _data.platform = _platforms.length > 1 ?
                                _platforms.join(',') : _platforms.toString();

                        }
                    }
                    if (vm.internetProviders.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat(",true");
                        var _internetProviderValues = vm.internetProviders.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.isps = _internetProviderValues.length > 1 ?
                            _internetProviderValues.join(',') : _internetProviderValues.toString();

                    }
                    else {
                        if (vm.internetProviders.options.length > 0) {
                            _data.segmentSelected = _data.segmentSelected.concat(",false");
                            var _internetProviderValues = vm.internetProviders.options.map(function (data) {
                                return data.Value;
                            });
                            _data.isps = _internetProviderValues.length > 1 ?
                                _internetProviderValues.join(',') : _internetProviderValues.toString();

                        }
                    }

                    if (vm.segmentTypes.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat(",true");
                        _segmentTypesValues = vm.segmentTypes.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.segmentTypes = _segmentTypesValues.length > 1 ?
                            _segmentTypesValues.join(',') : _segmentTypesValues.toString();

                    }
                    else {
                        if (vm.segmentTypes.options.length > 0) {
                            _data.segmentSelected = _data.segmentSelected.concat(",false");
                            _segmentTypesValues = vm.segmentTypes.options.map(function (data) {
                                return data.Value;
                            });
                            _data.segmentTypes = _segmentTypesValues.length > 1 ?
                                _segmentTypesValues.join(',') : _segmentTypesValues.toString();

                        }
                    }

                    if (vm.segments.selectedOptions.length > 0) {
                        _data.segmentSelected = _data.segmentSelected.concat(",true");
                        _segmentsValues = vm.segments.selectedOptions.map(function (data) {
                            return data.Value;
                        });
                        _data.segments = _segmentsValues.length > 1 ?
                            _segmentsValues.join(',') : _segmentsValues.toString();

                    }
                    else {
                        if (vm.segments.options.length > 0) {
                            _data.segmentSelected = _data.segmentSelected.concat(",false");
                            _segmentsValues = vm.segments.options.map(function (data) {
                                return data.Value;
                            });
                            _data.segments = _segmentsValues.length > 1 ?
                                _segmentsValues.join(',') : _segmentsValues.toString();

                        }
                    }

                    if (vm.subscribedStartDate && vm.subscribedStartDate !== "") {
                        _data.subscribed = utilitySrvc.getDateFormat(vm.subscribedStartDate);
                    }
                    else {
                        _data.subscribed = "";
                    }

                }
                else {
                    if (vm.internetProviders.options.length > 0) {
                        var _internetProviderValues = vm.internetProviders.options.map(function (data) {
                            return data.Value;
                        });
                        _data.isps = _internetProviderValues.length > 1 ?
                            _internetProviderValues.join(',') : _internetProviderValues.toString();
                    }
                    if (vm.platforms1.options.length > 0) {
                        var _platforms = vm.platforms1.options.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.platform = _platforms.length > 1 ?
                            _platforms.join(',') : _platforms.toString();
                    }
                    if (vm.countries.options.length > 0) {
                        var _countryValues = vm.countries.options.map(function (data) {
                            return data.DropdownID;
                        });
                        _data.countries = _countryValues.length > 1 ?
                            _countryValues.join(',') : _countryValues.toString();
                    }

                    if (vm.segmentTypes.options.length > 0) {
                        _segmentTypesValues = vm.segmentTypes.options.map(function (data) {
                            return data.Value;
                        });
                        _data.segmentTypes = _segmentTypesValues.length > 1 ?
                            _segmentTypesValues.join(',') : _segmentTypesValues.toString();
                    }
                    if (vm.segments.options.length > 0) {
                        _segmentsValues = vm.segments.options.map(function (data) {
                            return data.Value;
                        });
                        _data.segments = _segmentsValues.length > 1 ?
                            _segmentsValues.join(',') : _segmentsValues.toString();
                    }


                    _data.segmented = false;
                    _data.subscribed = "";
                }
                return _data;

            }

            vm.selectLargeImage = function () {
                if (!vm.isLargeImage) {
                    vm.bannerImage = "";
                }

            };

            vm.saveWelcome = function () {
                var deferred = $q.defer();
                if (!validate()) { vm.saving = false; return; }
                if (vm.startDate && vm.startDate !== '' || vm.duration == "unlimited") {
                    var currentDate = new Date();
                    currentDate.setMinutes(currentDate.getMinutes() + 15);

                    if ((new Date(vm.startDate)) > (currentDate)) {
                        vm.pendingWelcome(false);
                    }
                    else {
                        var promise;
                        promise = vm.pendingWelcome(true);
                    }

                }
                else {
                    var _data = beforSave();

                    if ($stateParams.id || vm.welcomeId) {
                        var id = $stateParams.id;
                        vm.welcomeId = $stateParams.id ? $stateParams.id : vm.welcomeId;
                        _data.welcomeId = $stateParams.id ? $stateParams.id : vm.welcomeId;

                        if (vm.startDate && vm.startDate !== '') {


                        }

                        else {

                            convertImgToDataURLviaCanvas(vm.selectedImage, function (data) {

                                $timeout(function () {
                                    vm.selectedImage = data;
                                    _data.imagePath = vm.selectedImage;

                                    campaignSrvc.draftWelcome(_data).then(function (response) {
                                        if (response.data.Result === "Success") {
                                            vm.saving = false;

                                            deferred.resolve("Success");

                                            vm.msgType = "saved";
                                            vm.launchConfirmationMessage(message.createWelcomePush.welcomeSavedMessage);

                                        }
                                        else {
                                            vm.messageBox(message.createWelcomePush.draftWelcomeFailure);
                                            deferred.resolve("Failed");
                                            vm.msgType = "f";
                                            vm.saved = true;
                                            vm.saving = false;
                                        }
                                    }, function () {

                                    });

                                }, 0);
                            });
                        }
                    }
                    else {
                        campaignSrvc.draftWelcome(_data).then(function (response) {

                            if (response.data.Result === "Success") {
                                vm.saved = true;
                                vm.savedOnly = true;
                                vm.saving = false;
                                vm.welcomeId = response.data.Record.welcomeId;
                                deferred.resolve("Success");


                                vm.msgType = "saved";
                                vm.launchConfirmationMessage(message.createWelcomePush.welcomeSavedMessage);

                            }
                            else {
                                vm.messageBox(message.createWelcomePush.updateDraftWelcomeFailure);
                                deferred.resolve("Failed");
                                vm.saving = false;
                                return;
                            }
                        }, function (response) {
                        })
                    }
                    return deferred.promise;
                }

            };

            vm.isSub = false;
            vm.deleteCampignEndDate = function () {

                vm.endDate = "";
            };
            vm.deleteCampignStartDate = function () {
                vm.startDate = "";
                vm.endDate = "";
            };

            vm.deleteSubDate = function () {
                vm.subscribedStartDate = "";
            };
            vm.valid = true;
            vm.checkIfExistWelcome = function () {
                var welcomeId = 0;
                if ($stateParams.id) {
                    vm.valid = true;
                    welcomeId = $stateParams.id;
                }
                vm.saving = true;
                vm.launching = true;

                campaignSrvc.checkIfExistWelcome({
                    welcomeName: vm.welcomeName,
                    welcomeId: welcomeId
                }).then(function (response) {
                    vm.saving = false;
                    vm.launching = false;
                    if (response.data.responseCode !== 200) {
                        vm.valid = false;
                        vm.messageBox(message.createWelcomePush.welcomeNameExists.formatstring(vm.welcomeName));

                        return false;
                    }
                    else {
                        vm.valid = true;
                        return true;
                    }

                }, function (response) {

                });
            };


            vm.pendingWelcome = function () {
                var deferred = $q.defer();

                vm.saving = true;

                var _data = beforSave();

                if ($stateParams.id || vm.welcomeId) {
                    var id = $stateParams.id;
                    vm.welcomeId = $stateParams.id ? $stateParams.id : vm.welcomeId;
                    _data.welcomeId = $stateParams.id ? $stateParams.id : vm.welcomeId;

                    convertImgToDataURLviaCanvas(vm.selectedImage, function (data) {

                        $timeout(function () {
                            vm.selectedImage = data;
                            _data.imagePath = vm.selectedImage;

                            campaignSrvc.pendingWelcome(_data).then(function (response) {
                                if (response.data.Result === "Success") {
                                    vm.saving = false;
                                    //vm.onSave();
                                    deferred.resolve("Success");

                                    vm.msgType = "saved";
                                    vm.launchConfirmationMessage(message.createWelcomePush.welcomeSavedMessage);

                                }
                                else {
                                    deferred.resolve("Failed");
                                    vm.msgType = "f";
                                    vm.saved = true;
                                    vm.saving = false;
                                    vm.messageBox(message.createWelcomePush.pendingWelcomeFailure);
                                }
                            }, function () {

                            });


                        }, 0);
                    });


                }
                else {
                    campaignSrvc.pendingWelcome(_data).then(function (response) {

                        if (response.data.Result === "Success") {
                            vm.saved = true;
                            vm.savedOnly = true;
                            vm.saving = false;
                            vm.welcomeId = response.data.Record.welcomeId;
                            deferred.resolve("Success");
                            vm.msgType = "saved";
                            vm.launchConfirmationMessage(message.createWelcomePush.welcomeSavedMessage);

                        }
                        else {
                            vm.messageBox(message.createWelcomePush.updatePendingWelcomeFailure);
                            deferred.resolve("Failed");
                            vm.saving = false;
                            return;
                        }
                    }, function (response) {
                    })
                }
                return deferred.promise;
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
                'vm.cities.selectedOptions', 'vm.countries.selectedOptions', 'vm.subscribedStartDate'
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


            function validate() {
                var validationPass = true;
                var currentDate = new Date();
                currentDate = new Date(formatDate(currentDate));

                var regax = /^[a-z0-9_]+$/i;

                if (!(vm.welcomeName) || vm.welcomeName === '') {
                    validationPass = false;

                    vm.messageBox(message.createWelcomePush.welcomeNameRequire);
                    return validationPass;
                }
                else if (vm.welcomeName.length > 50) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.welcomeNameLength);
                    return validationPass;
                }


                else if (!regax.test(vm.welcomeName)) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.welcomeNameFormant);
                    return validationPass;
                }

                if (!vm.selectedImage || (vm.selectedImage === "images/preview-icon.png")) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.imageRequire);
                    return validationPass;
                }

                else if ((!vm.headline) || vm.headline === '') {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.titleRequire);
                    return validationPass;

                }
                else if (vm.headline.length > 48) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.titleLength);
                    return validationPass;
                }
                else if ((!vm.textdescription) || vm.textdescription === '') {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.DescriptionRequire);
                    return validationPass;

                }
                else if (vm.textdescription.length > 100) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.DescriptionLengh);
                    return validationPass;
                }
                else if ((!vm.url) || vm.url === '') {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.urlRequire);
                    return validationPass;

                }
                else if (vm.url.length > 200) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.urlLenght);
                    return validationPass;
                }
                else if (vm.url !== '') {
                    if (!isUrlValid(vm.url)) {
                        validationPass = false;
                        vm.messageBox(message.createWelcomePush.urlFormat);
                        return validationPass;
                    }
                }
                if (vm.isLargeImage) {
                    if (!vm.bannerImage || (vm.bannerImage === "images/preview-icon.png")) {
                        validationPass = false;
                        vm.messageBox(message.createWelcomePush.imageRequire);
                        return validationPass;
                    }
                }
                //Beging Date validation

                if (vm.endDate && vm.startDate) {
                    if ((formatDate(vm.endDate)) === (formatDate(vm.startDate))) {
                        vm.messageBox(message.createWelcomePush.startDateEndDateShouldNotbeSame);
                        validationPass = false;
                        return validationPass;
                    }
                }

                if (vm.startDate && vm.startDate !== '') {
                    if ((new Date(formatDate(vm.startDate))) < (currentDate)) {
                        vm.messageBox(message.createWelcomePush.startDateGreatherThanCurrentDate);
                        validationPass = false;
                        return validationPass;
                    }

                    if (!vm.endDate || vm.endDate === '') {
                        validationPass = false;
                        vm.messageBox(message.createWelcomePush.endDateRequire);
                        return validationPass;

                    }
                }

                if (vm.endDate && vm.endDate !== '') {
                    if (!vm.startDate || vm.startDate === '') {
                        validationPass = false;
                        vm.messageBox(message.createWelcomePush.startDateRequire);
                        return validationPass;
                    }
                    else if ((new Date(formatDate(vm.endDate))) < (currentDate)) {
                        vm.messageBox(message.createWelcomePush.endDateGreatherThanCurrentDate);
                        validationPass = false;
                        return validationPass;
                    }
                    if ((new Date(formatDate(vm.endDate))) < (new Date(formatDate(vm.startDate)))) {
                        vm.messageBox(message.createWelcomePush.endDateLessThanStartDate);
                        validationPass = false;
                        return validationPass;
                    }
                }

                if (vm.segmented) {
                    if (vm.countries.selectedOptions.length < 1 && vm.cities.selectedOptions.length < 1 && vm.internetProviders.selectedOptions.length < 1 && vm.platforms1.selectedOptions.length < 1 && (vm.subscribedStartDate === undefined || vm.subscribedStartDate === '') && vm.segmentTypes.selectedOptions.length < 1 && vm.segments.selectedOptions.length < 1) {
                        validationPass = false;
                        vm.messageBox(message.createWelcomePush.selectSegment);
                        return validationPass;
                    }
                }
                if (!vm.valid) {
                    validationPass = false;
                    vm.messageBox(message.createWelcomePush.welcomeNameExists);
                    return validationPass;
                }
                return validationPass;
            }

            vm.loadWelcomeMessage = function () {

                if ($stateParams.id) {

                    vm.imgClass = "inActive";
                    vm.updImgClass = "active";
                    vm.isSelectImage = false;
                    vm.isuploadImage = true;
                    vm.isEdit = true;

                    vm.saved = true;
                    campaignSrvc.getWelcomeById({ welcomeId: $stateParams.id }).then(function (response) {
                        if (response.data.Result === "Success") {
                            var _welcomeMessageDetail = response.data.Record;

                            vm.welcomeName = _welcomeMessageDetail.welcomeName;
                            vm.url = _welcomeMessageDetail.forwardUrl;
                            vm.headline = _welcomeMessageDetail.title;
                            vm.textdescription = _welcomeMessageDetail.description;
                            vm.isPending = _welcomeMessageDetail.welcomeStatus === 2 ? true : false;  //2 is pending
                            vm.source = _welcomeMessageDetail.source;
                            vm.generic = _welcomeMessageDetail.generic;
                            vm.urlWelcome = _welcomeMessageDetail.welcome;
                            vm.segmentSelected = _welcomeMessageDetail.segmentSelected.split(',');
                            vm.messageOn.active = _welcomeMessageDetail.active;

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

                            if (_welcomeMessageDetail.subscribed && _welcomeMessageDetail.subscribed !== "NaN-NaN-NaNTNaN:NaN:NaN") {
                                vm.subscribedStartDate = _welcomeMessageDetail.subscribed;
                            }
                            if (_welcomeMessageDetail.active) {
                                vm.clsOnMessage = "btn btn-primary active";
                                vm.clsOffMessage = "btn btn-primary";
                            }
                            else {
                                vm.clsOffMessage = "btn btn-primary active";
                                vm.clsOnMessage = "btn btn-primary";
                            }
                            if (_welcomeMessageDetail.unlimited) {
                                vm.duration = "unlimited";
                                vm.startDate = "";
                                vm.endDate = "";
                            }
                            else {
                                vm.duration = "specific";
                            }

                            vm.startDate = _welcomeMessageDetail.welcomeScheduleDate;
                            vm.endDate = _welcomeMessageDetail.welcomeEndDate;
                            vm.segmented = _welcomeMessageDetail.segmented;
                            vm.isLargeImage = _welcomeMessageDetail.largeImage;

                            convertImgToDataURLviaCanvas(_welcomeMessageDetail.imagePath, function (data) {

                                $timeout(function () {
                                    vm.selectedImage = data;
                                }, 0);
                            });

                            if (vm.isLargeImage) {
                                convertImgToDataURLviaCanvas(_welcomeMessageDetail.bannerImage, function (data) {
                                    $timeout(function () {
                                        vm.bannerImage = data;
                                    }, 0);
                                });
                            }
                            else {
                                $('#fileselect5').val('');
                            }
                            if (vm.segmented) {
                                vm.type = "Seg";
                            }
                            else {
                                vm.type = "All";
                            }

                            if (_welcomeMessageDetail.segmented) {
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
                                imageSrc: _welcomeMessageDetail.imagePath,
                                imgtype: 'custom'
                            });
                            if (vm.isLargeImage) {
                                vm.uploadedBaner.push({
                                    imageSrc: _welcomeMessageDetail.bannerImage,
                                    imgtype: 'custom'
                                });
                            }

                            if (vm.segmentSelected[0] == "true") {
                                var countriesDetail = _welcomeMessageDetail.countries.split(',')
                                if (countriesDetail.length > 0 && countriesDetail[0] != "") {

                                    vm.countries.selectedOptions = vm.countries.options.filter(function (country) {
                                        return countriesDetail.includes(country.DropdownID.toString());
                                    })
                                }
                            }
                            else {
                                vm.countries.selectedOptions = [];
                            }
                            if (vm.segmentSelected[1] == "true") {
                                if (_welcomeMessageDetail.cities) {
                                    cityDetail = _welcomeMessageDetail.cities.split(',');
                                    if (cityDetail.length > 0 && cityDetail[0] !== "") {

                                        vm.cities.selectedOptions = vm.cities.options.filter(function (city) {
                                            return cityDetail.includes(city.DropdownID.toString());
                                        })
                                    }
                                }
                            }
                            else {
                                vm.cities.selectedOptions = [];
                            }
                            if (vm.segmentSelected[2] == "true") {
                                var platformsDetail = _welcomeMessageDetail.platform.split(',')
                                if (platformsDetail.length > 0 && platformsDetail[0] != "") {

                                    vm.platforms1.selectedOptions = vm.platforms1.options.filter(function (platform) {
                                        return platformsDetail.includes(platform.DropdownID.toString());
                                    })
                                }
                            }
                            else {
                                vm.platforms1.selectedOptions = [];
                            }
                            if (vm.segmentSelected[3] == "true") {
                                internetProviderDetail = _welcomeMessageDetail.isps.split(',');
                                if (internetProviderDetail.length > 0 && internetProviderDetail[0] != "") {
                                    vm.internetProvider = true;
                                    vm.internetProviders.selectedOptions = vm.internetProviders.options.filter(function (ISP) {
                                        return internetProviderDetail.includes(ISP.Value.toString())
                                    })
                                }
                            }
                            else {
                                vm.internetProviders.selectedOptions = [];
                            }

                            if (vm.segmentSelected[4] === "true") {
                                var segmentTypesDetail = _welcomeMessageDetail.segmentTypes.split(',')
                                if (segmentTypesDetail.length > 0 && segmentTypesDetail[0] != "") {

                                    vm.segmentTypes.selectedOptions = vm.segmentTypes.options.filter(function (segmentType) {
                                        return segmentTypesDetail.includes(segmentType.Value.toString());
                                    })


                                }
                            }
                            else {
                                vm.segmentTypes.selectedOptions = [];
                            }

                            if (vm.segmentSelected[5] === "true") {

                                segmentDetail = _welcomeMessageDetail.segments.split(',')
                                if (segmentDetail.length > 0 && segmentDetail[0] != "") {

                                    vm.segments.selectedOptions = vm.segments.options.filter(function (segment) {
                                        return segmentDetail.includes(segment.Value.toString());
                                    })
                                }
                            }
                            else {
                                vm.segments.selectedOptions = [];
                            }








                        }

                    }, function (response) {
                    })
                }

            };
            $timeout(function () {
                vm.loadWelcomeMessage();

            }, 0);

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


            // vm.oldvalueTitle = '';
            // //Remove extra tag when copy and paste
            // $('#title .emoji-wysiwyg-editor').on("DOMSubtreeModified", function (evt) {
            //     var allImg = $(this).find(".img");
            //     var innrText = $(this).text();
            //     var emojiInnerLength = (allImg.length) + innrText.length;
            //     if (emojiInnerLength > 48) {
            //         $(this).blur();
            //         var val = $(this).text().substring(0, 48);
            //         $(this).html(vm.oldvalueTitle);
            //         vm.headline = vm.headline.substring(0, 48);
            //     }
            //     else {
            //         vm.oldvalueTitle = $(this).html();
            //         vm.headline = vm.headline ? vm.headline.substring(0, 48) : "";
            //     }
            // });

            // vm.oldvalueMessage = '';
            // $('#message .emoji-wysiwyg-editor').on("DOMSubtreeModified", function (evt) {
            //     var allImg = $(this).find(".img");
            //     var innrText = $(this).text();
            //     var emojiInnerLength = (allImg.length) + innrText.length;
            //     if (emojiInnerLength > 100) {
            //         $(this).blur();
            //         var val = $(this).text().substring(0, 100);
            //         $(this).html(vm.oldvalueMessage);
            //         vm.textdescription = vm.textdescription.substring(0, 100);
            //     }
            //     else {
            //         vm.oldvalueMessage = $(this).html();
            //         vm.textdescription = vm.textdescription ? vm.textdescription.substring(0, 100) : "";
            //     }
            // });

            // function placeCaretAtEnd(el) {
            //     if (typeof window.getSelection != "undefined"
            //         && typeof document.createRange != "undefined") {
            //         var range = document.createRange();
            //         range.selectNodeContents(el);
            //         range.collapse(false);
            //         var sel = window.getSelection();
            //         sel.removeAllRanges();
            //         sel.addRange(range);
            //     } else if (typeof document.body.createTextRange != "undefined") {
            //         var textRange = document.body.createTextRange();
            //         textRange.moveToElementText(el);
            //         textRange.collapse(false);
            //         textRange.select();
            //     }
            // }


            // $('#title .emoji-wysiwyg-editor').on("scroll", function (evt) {
            //     placeCaretAtEnd(this);
            // });

            // $('#message .emoji-wysiwyg-editor').on("scroll", function (evt) {
            //     placeCaretAtEnd(this);
            // });

            // //Remove extra tag when copy and paste
            // var emojiEditor = document.getElementsByClassName("emoji-wysiwyg-editor");
            // emojiEditor[0].addEventListener("paste", function (e) {
            //     utilitySrvc.findEmojiTxtLength(e, 48, emoji, vm.headline);
            //     this.blur();
            // });
            // emojiEditor[1].addEventListener("paste", function (e) {
            //     utilitySrvc.findEmojiTxtLength(e, 100, emoji, vm.textdescription);
            //     this.blur();
            // });
            // //Remove extra tag when copy and paste

            // $(".emoji-picker-icon").click(function () {
            //     var elemId = $(this).attr("data-id")
            //     $(".emoji-menu[data-id!='" + elemId + "']").hide();
            // });

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
        }],

        controllerAs: 'vm'
    });
})();