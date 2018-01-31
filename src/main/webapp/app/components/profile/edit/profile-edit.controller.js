(function () {
    var app = angular.module('app');

    app.controller('editProfileCtrl', ['$http', 'ProfileSrvc', '$cookies', 'MessageBoxSrvc','$timeout','$uibModalStack','message', function ($http, ProfileSrvc, $cookies, MessageBoxSrvc,$timeout,$uibModalStack,message) {
        var vm = this;
        var userCookiedData = {};
        vm.profileModel = {};
        if ($cookies) {
            userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
            if (userCookiedData) {
                vm.profileModel = {
                    userId: userCookiedData.userId,
                    salutation: userCookiedData.salutation,
                    fullName: userCookiedData.firstName + ' ' + userCookiedData.lastName,
                    title: userCookiedData.title,
                    company: userCookiedData.company,
                    emailId: userCookiedData.emailId,
                    phoneNumber: userCookiedData.phone,
                    username: userCookiedData.username,
                    firstName: userCookiedData.firstName,
                    subDomain:userCookiedData.subDomain +".iopushtech.com",
                    websitURL:userCookiedData.websiteUrl
                }
            }

        }

        vm.updateProfile = function () {
            ProfileSrvc.editProfile(vm.profileModel).then(function (response) {
                MessageBoxSrvc.successMessageBox(response.data.responseDescription);
                userCookiedData.salutation = response.config.data.salutation;
                userCookiedData.title = response.config.data.title;
                userCookiedData.company = response.config.data.company;
                userCookiedData.firstName = response.config.data.firstName;
                userCookiedData.phone = response.config.data.phoneNumber;
                userCookiedData.emailId = response.config.data.emailId;

                $cookies.put('userData', JSON.stringify(userCookiedData));

                //   $timeout(function () {
                //       $uibModalStack.dismissAll();
                //                 //$uibModalInstance.dismiss();                           
                //             }, 5000);

            }, function (error) {
                MessageBoxSrvc.warningMessageBox(response.data.responseDescription);
            });
        };

    }]);
})();