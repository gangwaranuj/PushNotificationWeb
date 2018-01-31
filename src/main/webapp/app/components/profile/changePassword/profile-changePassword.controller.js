(function () {
    var app = angular.module('app');

    app.controller('changePasswordCtrl', ['$http', '$scope', 'ProfileSrvc', '$cookies', 'masterSrvc', 'MessageBoxSrvc', '$timeout', '$uibModalStack','message', function ($http, $scope, ProfileSrvc, $cookies, masterSrvc, MessageBoxSrvc, $timeout, $uibModalStack,message) {
        var vm = this;
        vm.passwordModel = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
        vm.isCorrectPasword = true;
        var regexExpsObj = masterSrvc.passwordRegex();
        // var reg="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}";// '((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})';
        var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
        var pwd = new RegExp(reg, 'i');
        //   pwd.test();

        vm.checkPassword = function (value) {
            return /[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value) && value.length>=8 && value.length<=20 ;
        };
        $scope.$watch('vm.passwordModel.newPassword', function (oldVal, newVal) {
            var isMatchSan = vm.passwordModel.newPassword.match(regexExpsObj['san']);
            var isMatchAn = vm.passwordModel.newPassword.match(regexExpsObj['an']);
            var isMatchSn = vm.passwordModel.newPassword.match(regexExpsObj['sn']);
            var isMatchSa = vm.passwordModel.newPassword.match(regexExpsObj['sa']);
            var isMatchAln = vm.passwordModel.newPassword.match(regexExpsObj['aln']);
            if (vm.passwordModel.newPassword) {

               if(!vm.checkPassword(vm.passwordModel.newPassword)){
                //if (!pwd.test(vm.passwordModel.newPassword)) {
                    //  if (isMatchSan == null && isMatchAn == null && isMatchSn == null && isMatchSa == null && isMatchAln==null) {
                    vm.isCorrectPasword = false;
                } else {
                    vm.isCorrectPasword = true;
                }
            }
        });



        vm.updatePassword = function () {
            var isMatchSan = vm.passwordModel.newPassword.match(regexExpsObj['san']);
            var isMatchAn = vm.passwordModel.newPassword.match(regexExpsObj['an']);
            var isMatchSn = vm.passwordModel.newPassword.match(regexExpsObj['sn']);
            var isMatchSa = vm.passwordModel.newPassword.match(regexExpsObj['sa']);
            var isMatchAln = vm.passwordModel.newPassword.match(regexExpsObj['aln']);

            if (vm.passwordModel.currentPassword == "" || vm.passwordModel.newPassword == "" || vm.passwordModel.confirmPassword == "") {
                MessageBoxSrvc.warningMessageBox(message.profile.enterPassword);
            }
             else if(!vm.checkPassword(vm.passwordModel.newPassword)){
         //   else if (!pwd.test(vm.passwordModel.newPassword)) {
                //  else if (isMatchSan == null && isMatchAn == null && isMatchSn == null && isMatchSa == null && isMatchAln==null) {
                MessageBoxSrvc.warningMessageBox(message.profile.passwordFormat);
            } else if (vm.passwordModel.newPassword !== vm.passwordModel.confirmPassword) {
                MessageBoxSrvc.warningMessageBox(message.profile.passwordMatching);
            }
            else {
                ProfileSrvc.changePassword($.param({ oldPassword: vm.passwordModel.currentPassword, newPassword: vm.passwordModel.newPassword }))
                    .then(function (response) {
                        MessageBoxSrvc.successMessageBox(response.data.responseDescription);
                        // $timeout(function () {
                        //     $uibModalStack.dismissAll();
                        //     //  $uibModalInstance.dismiss();                           
                        // }, 5000);
                    }, function (error) {
                        MessageBoxSrvc.warningMessageBox(response.data.responseDescription);
                    });
            }

        };


    }]);
})();