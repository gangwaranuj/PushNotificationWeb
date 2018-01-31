(function () {
    var app = angular.module('app');
    app.component('getInTouch', {

        bindings: {
            closeModal: '='
        },
        //using following datepicker
        //https://github.com/Gillardo/bootstrap-ui-datetime-picker 
        // Load the template
        templateUrl: 'app/shared/components/GetInTouch/getintouch.html',
        controller: ['$scope', 'masterSrvc', '$cookies', 'message', '$uibModal', function ($scope, masterSrvc, $cookies, message, $uibModal) {

            var vm = this;

            //vm.errorMsg = "*Please fill all required fields";
            vm.errorMsg = '';
            vm.countriesData = [];
            vm.selectedCountry = { "flag": "http://restcountries.eu/data/deu.svg", "callingCodes": ["+49"] };
            vm.phoneNumber = "+49";
            vm.monthlyWebsiteVisitors = "";

            vm.updateSelectedCountry = function () {
                var _phn = vm.phoneNumber.replace("+", "");
                if (_phn) {
                    var _selectedCountry = vm.countriesData.filter(function (item) {
                        return item.callingCodes[0] && _phn.indexOf(item.callingCodes[0]) == 0;
                    });
                    if (_selectedCountry && _selectedCountry[0]) {
                        vm.selectedCountry = _selectedCountry[0];
                        return;
                    }
                    else {
                        vm.selectedCountry = { "flag": "http://restcountries.eu/data/deu.svg", "callingCodes": ["49"] }
                    }
                    return;
                }
                else {

                }


            }



            vm.renderFlags = function () {
                masterSrvc.getCountryInfo().then(function (response) {
                    vm.countriesData = response.data;
                    if ($cookies) {
                        userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                        if (userCookiedData) {
                            vm.fullName = '';
                            vm.fullName = userCookiedData.firstName ? userCookiedData.firstName : "";
                            vm.fullName = vm.fullName + (userCookiedData.lastName ? " " + userCookiedData.lastName : "");
                            vm.phoneNumber = userCookiedData.phone;
                            vm.websiteUrl = userCookiedData.websiteUrl;
                            vm.companyEmail = userCookiedData.emailId;
                            vm.companyName = userCookiedData.company;
                            vm.userId = userCookiedData.userId;
                            vm.updateSelectedCountry();
                        }

                    }
                }, function (err) {
                    console.log(err);
                })
            }
            vm.renderFlags();

            vm.selectFlag = function (country) {
                vm.selectedCountry = country;
                vm.phoneNumber = "+" + vm.selectedCountry.callingCodes[0];
            }



            vm.saveUserQuery = function () {
                if (vm.validate()) {
                    masterSrvc.saveUserQueryRequest({
                        "phoneNumber": vm.phoneNumber,
                        "fullName": vm.fullName,
                        "company": vm.companyName,
                        "websiteUrl": vm.websiteUrl,
                        "message": vm.message,
                        "monthlyWebsiteVisitors": vm.monthlyWebsiteVisitors,
                        "emailId": vm.companyEmail,
                        "userId": vm.userId,
                        "source": "Backoffice/ioPush"
                    }).then(function (response) {
                        vm.closeModal();
                        if (response.status == 200 && response.data.responseCode == 200) {
                            vm.launchConfirmationMessage(message.paypal.contactSuccessMessage);
                        }
                        else {
                            vm.messageBox(message.paypal.contactSaveError);
                        }
                    }, function (err) {
                        vm.messageBox(message.paypal.contactSaveError);
                        console.log(err);
                    });
                }
                return;
            }
            vm.launchConfirmationMessage = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/components/GetInTouch/successMessage.html',
                    controller: ['$scope', '$uibModalInstance', '$state', '$timeout', 'confirmationMessage', 'message', function (modalScope, $uibModalInstance, $state, $timeout, confirmationMessage, message) {
                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.closeModal();
                            //$cookies.put("aciveMenu", 9);
                            //$state.go('iopush.auth.manageWelcomeNotification');
                        };

                        modalScope.confirmationMessage = { msg: confirmationMessage };
                    }
                    ],
                    backdrop: 'static',
                    size: 'md',
                    windowClass: 'messages-sm-modal sucessModal',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };

            vm.validate = function () {
                if (!vm.fullName || !vm.fullName.trim()) {
                    angular.element('#fName').focus();
                    vm.errorMsg = message.paypal.fullNameValidation;
                    return false;
                }

                if (!vm.companyEmail || !vm.companyEmail.trim()) {
                    angular.element('#cEmail').focus();
                    vm.errorMsg = message.paypal.businessEmailValidation;
                    return false;
                }

                if (!isValidEmailAddress(vm.companyEmail)) {
                    angular.element('#cEmail').focus();
                    vm.errorMsg = message.paypal.emailFormatValidation;
                    return false;
                }

                if (!vm.phoneNumber || !vm.phoneNumber.trim()) {
                    angular.element('#pNumber').focus();
                    vm.errorMsg = message.paypal.phoneNumberValidation;
                    return false;
                }

                if (!isValidPhoneNumber(vm.phoneNumber)) {
                    angular.element('#pNumber').focus();
                    vm.errorMsg = message.paypal.phoneNumberFormatValidation;
                    return false;
                }



                if (!vm.websiteUrl || !vm.websiteUrl.trim()) {
                    angular.element('#wUrl').focus();
                    vm.errorMsg = message.paypal.websiteUrlValidation;
                    return false;
                }

                if (!isValidWebsiteUrl(vm.websiteUrl)) {
                    angular.element('#wUrl').focus();
                    vm.errorMsg = message.paypal.websiteUrlFormatValidation;
                    return false;
                }

                if (!vm.companyName || !vm.companyName.trim()) {
                    angular.element('#cName').focus();
                    vm.errorMsg = message.paypal.companyNameValidation;
                    return false;
                }
                if (!vm.monthlyWebsiteVisitors || !vm.monthlyWebsiteVisitors.trim()) {
                    angular.element('#mVisit').focus();
                    vm.errorMsg = message.paypal.monthlyWebsiteVisitorsValidation;
                    return false;
                }
                if (isNaN(vm.monthlyWebsiteVisitors)) {
                    angular.element('#mVisit').focus();
                    vm.errorMsg = message.paypal.monthlyWebsiteVisitorsFormatValidation;
                    return false;
                }
                if (vm.message && vm.message !== "") {
                    if (vm.message.length > 250) {
                        angular.element('#msg').focus();
                        vm.errorMsg = message.paypal.msg;
                        return false;
                    }
                }

                return true;
            }

            function isValidPhoneNumber(number) {

                var pattern = new RegExp(/^(\+\d{1,3}[- ]?)?\d{6,12}$/);
                return pattern.test(number);
            }

            function isValidEmailAddress(emailAddress) {
                var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
                return pattern.test(emailAddress);
            };

            function isValidWebsiteUrl(weburl) {
                var pattern = new RegExp(/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i);
                return pattern.test(weburl);
            }

            vm.messageBox = function (confirmationMessage) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/shared/components/GetInTouch/errorMessage.html',
                    controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', 'message', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout, message) {
                        modalScope.confirmationMessage = confirmationMessage;

                        modalScope.closeModal = function () {
                            $uibModalInstance.dismiss();
                            vm.closeModal();
                        };

                    }
                    ],
                    backdrop: 'static',
                    size: 'md',
                    windowClass: 'messages-sm-modal errorModal',
                    resolve: {
                        confirmationMessage: function () {
                            return confirmationMessage;
                        }
                    }
                });
            };

        }],


        controllerAs: 'vm'
    });
})();