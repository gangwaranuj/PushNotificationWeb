(function () {
    var app = angular.module('app');

    app.controller('uploadPhotoCtrl', ['$http', 'ProfileSrvc', '$cookies', '$rootScope', 'MessageBoxSrvc', '$state', '$cookieStore', '$timeout', '$uibModalStack','message', function ($http, ProfileSrvc, $cookies, $rootScope, MessageBoxSrvc, $state, $cookieStore, $timeout, $uibModalStack,message) {
        var vm = this;

        vm.uploadPhotoModel = {
            image: '',
            images: []
        };
        var userCookiedData = {};
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
        //scope.images = [];
        if ($cookies) {
            userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
        }
        // if(userCookiedData.imagePath == "./images/icons/default-profile-icon.png")
        // {
        //     vm.uploadPhotoModel.selectedImage = ""
        // }
        if(userCookiedData.imagePath != "./images/icons/default-profile-icon.png"){
            if (userCookiedData.imagePath && userCookiedData.imagePath != "") {
            //	var random = (new Date().getTime()).toString();
            vm.uploadPhotoModel.images.push({
                imageSrc: $cookieStore.get('profilePath'),//+ "?cb=" + random,//userCookiedData.imagePath,
                imgtype: 'custom'
            });
            
            vm.uploadPhotoModel.selectedImage = $cookieStore.get('profilePath');
            convertImgToDataURLviaCanvas(vm.uploadPhotoModel.selectedImage, function (data) {
                $timeout(function () {
                    vm.uploadPhotoModel.selectedImage = data;
                }, 0);
            });
        }
    }
    else{
        vm.uploadPhotoModel.selectedImage = "./images/icons/default-profile-icon.png";
    }
        

        vm.uploadPhoto = function () {
            $rootScope.profileImg = "";
            if (vm.uploadPhotoModel.selectedImage == undefined || vm.uploadPhotoModel.selectedImage == "./images/icons/default-profile-icon.png") {
                MessageBoxSrvc.warningMessageBox(message.profile.selectProfilePicture);
                return;
            }
            if ($cookies) {
                userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
            }

            var nonce = (new Date().getTime()).toString();
            //console.log('nonce', nonce);
            ProfileSrvc.uploadPhoto($.param({ file: vm.uploadPhotoModel.selectedImage, userId: userCookiedData.userId }))
                .then(function (response) {
                    var random = (new Date().getTime()).toString();

                    var imagePathWithCacheBuster = response.data.Record.imagePath + "?cb=" + random;

                    userCookiedData.imagePath = imagePathWithCacheBuster;

                    $cookieStore.put('profilePath', imagePathWithCacheBuster);

                    //$rootScope.profileImg = response.data.Record.imagePath + "?cb=" + random;

                    $cookies.put('userData', JSON.stringify(userCookiedData));

                    MessageBoxSrvc.successMessageBox(message.profile.profilePictureUpload);

                    // $timeout(function () {
                    //     $uibModalStack.dismissAll();                          
                    //  }, 5000);

                }, function (error) {
                    $rootScope.profileImg = userCookiedData.imagePath;
                    MessageBoxSrvc.warningMessageBox(message.profile.profilePictureUploadError);
                });
        }

        vm.uploadFromButton = function () {
            $('#fileselect').click();
            vm.uploadPhotoModel.showRemove = "true";
        };

        if ($cookieStore.get('profilePath').indexOf("user") < 0) {
            vm.uploadPhotoModel.showRemove = "false";
        }
        else {
            vm.uploadPhotoModel.showRemove = "true";
        }

        // if(vm.uploadPhotoModel.selectedImage.indexOf("images")===-1)
        // {
        // vm.uploadPhotoModel.showRemove="false";
        // }
        // else{
        //    vm.uploadPhotoModel.showRemove="true"; 
        // }

        vm.removePhoto = function () {

            if ($cookies) {
                userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
            }
            if (userCookiedData.imagePath == "") {
                MessageBoxSrvc.warningMessageBox(message.profile.selectProfilePicture);
                return;
            }
            ProfileSrvc.removePhoto($.param({ userId: userCookiedData.userId }))
                .then(function (response) {

                    // userCookiedData.imagePath = "";
                    // $cookies.put('userData', JSON.stringify(userCookiedData));
                    $rootScope.profileImg = "";
                    vm.uploadPhotoModel.images = [];
                    var _defaultImagePath = "./images/icons/default-profile-icon.png";
                    //  $cookieStore.put('profilePath', './images/profile-pic.png');
                    vm.uploadPhotoModel.selectedImage = undefined;
                    vm.uploadPhotoModel.showRemove = "false";
                    $cookieStore.put('profilePath', _defaultImagePath);
                    vm.uploadPhotoModel.images.push({
                        imageSrc: _defaultImagePath,//userCookiedData.imagePath,
                        imgtype: 'custom'
                    });

                    $('#fileselect').val(''); //Reseting file input

                    MessageBoxSrvc.successMessageBox(message.profile.profilePictureRemoved);
                    //  $timeout(function () {
                    //   $uibModalStack.dismissAll();
                    //            // $uibModalInstance.dismiss();                           
                    //         }, 5000);

                }, function (error) {
                    MessageBoxSrvc.warningMessageBox(message.profile.profilePictureRemovedError);
                });
        }

    }]);
})();