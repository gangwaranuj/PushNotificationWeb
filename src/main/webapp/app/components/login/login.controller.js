(function () {
    var app = angular.module('app');

    app.controller('loginCtrl', ['$rootScope', '$location', '$cookieStore', 'UserService', '$state', '$uibModal', '$timeout', '$scope', '$cookies', 'message',
        function ($rootScope, $location, $cookieStore, UserService, $state, $uibModal, $timeout, $scope, $cookies, message) {
            var vm = this;
            vm.isforgetPassword = true;
            vm.isforgetPasswordReset = false;
            vm.isforgetPasswordSent = false;
            vm.emailAdderess = "";
            vm.responseCode = "";
            vm.isSent = false;
            vm.error = {};
            vm.message = "";
            vm.remember = false;
            vm.loginModel = {};
            vm.loginTexts = "Log in";
            vm.visitedEmail = false;
            vm.showEmailRequiredError=false;
            vm.invalidEmailId=message.login.invalidEmailFormat

//  $scope.filters = { user: '', pwd: '' };
 
//         // read filters from the query string, and use them to
//         // replace the default filters
//         var qs = $location.search();
//         for (var fld in $scope.filters) {
//             if (fld in qs) {
//                 alert(qs[fld]);
//               //  $scope.filters[fld] = qs[fld];
//             }
//         }
           // alert($location.search());
            vm.login = function () {
                UserService.authenticate($.param({ username: vm.loginModel.username, password: vm.loginModel.password, 'remember-me': vm.remember }))


                    .then(function (authenticationResult) {
                        var _defaultImagePath = "";
                        _defaultImagePath = "./images/icons/default-profile-icon.png";
                        var loginUserData = {
                            userId: authenticationResult.data.userId,
                            emailId: authenticationResult.data.emailId == null ? "" : authenticationResult.data.emailId,
                            phone: authenticationResult.data.phoneNumber == null ? "" : authenticationResult.data.phoneNumber,
                            firstName: authenticationResult.data.firstName == null ? "" : authenticationResult.data.firstName,
                            lastName: authenticationResult.data.lastName == null ? "" : authenticationResult.data.lastName,
                            salutation: authenticationResult.data.salutation == null ? "Mr" : authenticationResult.data.salutation,
                            company: authenticationResult.data.company == null ? "" : authenticationResult.data.company,
                            title: authenticationResult.data.title == null ? "" : authenticationResult.data.title,
                            imagePath: (authenticationResult.data.imagePath == null) ? _defaultImagePath : authenticationResult.data.imagePath,
                            username: authenticationResult.data.username == null ? "" : authenticationResult.data.username,
                            websiteUrl: authenticationResult.data.websiteUrl == null ? "" : authenticationResult.data.websiteUrl,
                            pid: authenticationResult.data.pid == null ? "" : authenticationResult.data.pid,
                            subDomain: authenticationResult.data.subDomain == null ? "" : authenticationResult.data.subDomain
                        }
                        $cookieStore.put('profilePath', loginUserData.imagePath);
                        $rootScope.profileImg = loginUserData.imagePath;
                        $cookieStore.put('userData', loginUserData);
                        //$cookies.remove('acitveMenu');      
                        $state.go('iopush.auth.dashboard');

                    }, function (error) {
                        if (error.status === 700) {
                            vm.error.msg = error.msg;
                        }
                        else {
                            vm.error.msg = message.login.invalidCredentials;
                            vm.error.errmsgclass = "unauthorized";
                        }
                    });
            };

            vm.setErrorMessage=function(){
                if(!vm.emailAdderess || !vm.emailAdderess.trim()){
                    vm.showEmailRequiredError=true;
                }
            }
            vm.hideEmailRequiredErrorMsg=function(){
                 vm.showEmailRequiredError=false;
                 return true;
            }

            vm.resetPassword = function () {
                //UserService.authenticate(vm.loginModel).then(function(authenticationResult) {
                UserService.resetPassword({ username: vm.emailAdderess })
                    .then(function (response) {
                        if (response.data.responseCode === 206) {
                            vm.isSent = false;
                            vm.message = message.login.forgetPassword;

                        }
                        else if (response.data.responseCode === 200) {
                            vm.isSent = true;
                            vm.loginTexts = message.login.checkMail;
                        }
                        else {
                            vm.isSent = false;
                            vm.message = message.error.internalError;
                        }
                        vm.isforgetPasswordSent = true;
                        vm.isforgetPassword = false;
                        vm.isforgetPasswordReset = false;

                    }, function (error) {

                    });


            };
            vm.backtoSignIn = function () {
                vm.loginTexts = "Log in";
                vm.isforgetPasswordSent = false;
                vm.isforgetPassword = true;
                vm.isforgetPasswordReset = false;
                vm.emailAdderess = '';
                vm.showEmailRequiredError=false;
            }
            vm.forgetPassword = function () {
                vm.loginTexts = "Forgot Password";
                vm.isforgetPassword = false;
                vm.isforgetPasswordReset = true;
            }
        }]);
})();