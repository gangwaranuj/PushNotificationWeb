(function () {
    angular.module('app').factory('ProfileSrvc', ['$http', '$q', function ($http, $q) {
        var service = {};
        service.changePassword = function (passwords) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/user/changePassword',
                data: passwords,//decodeURIComponent(passwords),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.editProfile = function (profileData) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/user/updateProfile',
                data: profileData,
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.uploadPhoto = function (photoData) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/user/updateImage',
                data: photoData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        service.removePhoto = function(data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/user/removeImage',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        return service;
    }]);
})();