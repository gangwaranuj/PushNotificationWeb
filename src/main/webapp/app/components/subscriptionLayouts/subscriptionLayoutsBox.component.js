(function () {
    var app = angular.module('app');
    app.component('subscriptionBox', {
        // defines a two way binding in and out of the component
        bindings: {
            formdata: "="
        },
        // Load the template
        templateUrl: 'app/components/subscriptionLayouts/subscriptionLayoutsBox.html',
        controller: ['$scope', '$uibModal', 'WizardHandler', 'masterSrvc', '$location', '$cookies', '$rootScope', 'campaignSrvc', 'utilitySrvc', '$stateParams', '$q', '$timeout', '$cookieStore', 'message', 'emoji', '$state','subscriptionLayoutSrvc',  function ($scope, $uibModal, WizardHandler, masterSrvc, $location, $cookies, $rootScope, campaignSrvc, utilitySrvc, $stateParams, $q, $timeout, $cookieStore, message, emoji, $state,subscriptionLayoutSrvc) {
            var vm = this;
            //Valialbe declaration
            vm.start = "start";
            vm.end = "end";
            var cityDetail;
            vm.uploadedimage = [];
            vm.imgClass = "active";
            vm.updImgClass = "inActive";
            vm.isSelectImage = true;
            vm.isuploadImage = false;
            vm.clsOnNotification = "btn btn-primary active";
            vm.clsOffNotification = "btn btn-primary";
            vm.selectedImage = "images/preview-icon.png";
            vm.type = $location.path().split('/');

            vm.customNotificationDetails = {};
            var storedNotificationDetails = subscriptionLayoutSrvc.layoutDetails;
            if (storedNotificationDetails) {
                
                var layoutParams =storedNotificationDetails;
                if (layoutParams.type == vm.type[2]) {
                    vm.customNotificationDetails = layoutParams;
                }
                else {
                    vm.customNotificationDetails = subscriptionLayoutSrvc.defaultLayoutDetails();
                    vm.customNotificationDetails.customNotificationId=layoutParams.customNotificationId;
                }
            }
            else {
                $state.go('iopush.auth.subscriptionLayouts');
            }

            vm.notificationOffFlag = true;
            vm.notificationOn = {};
            vm.notificationOff = {};
            vm.customNotificationDetails.type = vm.type[2];
            vm.pageHeading = vm.type[2];




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



            vm.previewBoxOpen = { "android": [true, "io-subprv-up"], "firefox": [true, "io-subprv-up"], "chrome": [true, "io-subprv-up"], "opera": [true, "io-subprv-up"] };
            //vm.ioSubprvUpDown = "io-subprv-up";


            //Preview show hide
            vm.showhidePreview = function (platform) {
                if (vm.previewBoxOpen[platform][0]) {
                    vm.previewBoxOpen[platform][0] = false;
                    vm.previewBoxOpen[platform][1] = 'io-subprv-down';
                    return;
                }
                vm.previewBoxOpen[platform][0] = true;
                vm.previewBoxOpen[platform][1] = 'io-subprv-up';
            }

            vm.launchConfirmationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/confirmation.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            $state.go('iopush.auth.subscriptionLayouts');
                        };

                        // $timeout(function () {

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
            var getCustomNotificationDetail = function () {
                if (storedNotificationDetails) {
                    convertImgToDataURLviaCanvas(vm.customNotificationDetails.logoPath, function (data) {
                        $timeout(function () {
                            vm.customNotificationDetails.logoPath = data;
                        }, 0);
                    });

                    if (vm.customNotificationDetails.logoPath != '') {
                        vm.uploadedimage.push({
                            imageSrc: vm.customNotificationDetails.logoPath,
                            imgtype: 'custom'
                        });
                        vm.isuploadImage = true;
                        vm.isSelectImage = false;
                        vm.imgClass = "inActive";
                        vm.updImgClass = "active";
                    }
                    else if (vm.customNotificationDetails.logoPath == '') {
                        vm.customNotificationDetails.logoPath = "images/preview-icon.png";
                    }
                }

                else {
                    return;
                }

            };
            getCustomNotificationDetail();
            vm.getSelectedImage = function (image) {
                // console.log(image.custom);
            };

            vm.uploadImage = function () {
                vm.imgClass = "inActive";
                vm.updImgClass = "active";
                vm.isSelectImage = false;
                vm.isuploadImage = true;
                vm.preImages.forEach(function (img) {
                    img.selected = false;
                });
                if (!vm.isuploadImage) {
                    vm.customNotificationDetails.logoPath = "images/preview-icon.png";
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

            vm.selectImage = function () {
                vm.imgClass = "active";
                vm.updImgClass = "inActive";
                vm.isSelectImage = true;
                vm.isuploadImage = false;
                vm.uploadedimage = [];
                $('#fileselect').val('');
                if (!vm.isSelectImage) {
                    vm.customNotificationDetails.logoPath = "images/preview-icon.png";

                }

            };

            vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/templates/warning.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout) {
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
            vm.saveCustomNotification = function (customNotificationDetails) {
                //console.log("customNotificationDetails",customNotificationDetails);
                if (customNotificationDetails.title == '') {
                    vm.messageBox(message.subscriptionLayout.customNotificationTitleRequire);
                    return;
                }
                else if (customNotificationDetails.message == '') {
                    vm.messageBox(message.subscriptionLayout.customNotificationMessageRequire);
                    return;
                }
                else if (customNotificationDetails.logoPath === '' || customNotificationDetails.logoPath === "images/preview-icon.png") {
                    vm.messageBox(message.subscriptionLayout.imageRequire);
                    return;
                }
                else if (customNotificationDetails.allowText == '') {
                    vm.messageBox(message.subscriptionLayout.allowBtnTextRequired);
                    return;
                }
                else if (customNotificationDetails.dontAllowText == '') {
                    vm.messageBox(message.subscriptionLayout.dontAllowBtnTextRequired);
                    return;
                }

                else if (customNotificationDetails.delayTime > 999) {
                    vm.messageBox(message.subscriptionLayout.delayTimeValidation);
                    return;
                }
                convertImgToDataURLviaCanvas(customNotificationDetails.logoPath, function (data) {
                    $timeout(function () {
                        customNotificationDetails.logoPath = data;
                    }, 0);
                });
                vm.customNotificationDetails.type = vm.type[2];
              
                   vm.customNotificationDetails.deviceType="desktop";
                campaignSrvc.saveCustomNotification(customNotificationDetails).then(function (response) {
                    if (response.data.responseCode === 200) {
                        subscriptionLayoutSrvc.layoutDetails=undefined;
                        vm.launchConfirmationMessage(response.data.responseDescription);
                    }
                    else {
                        vm.messageBox(response.data.responseDescription);
                        return;
                    }
                }, function (response) {
                });
            };

            $(function () {
                $('#cp1').colorpicker();
                $('#cp2').colorpicker();
                $('#cp3').colorpicker();
                $('#cp4').colorpicker();
                $('#cp5').colorpicker();
                $('#cp6').colorpicker();
            });

        }],

        controllerAs: 'vm'
    });
})();