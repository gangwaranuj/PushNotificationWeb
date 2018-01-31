(function () {
	angular.module('app').factory('UserService', ['$http', '$q', '$resource', function ($http, $q, $resource) {
		var service = {};
		service.authenticate = function (login) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'rest/authenticate',
				data: login,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function (response) {
				if (response.data.grantedAuthorities === null || response.data.grantedAuthorities.length < 1) {
					deferred.reject({
						status: 700,
						msg: 'you do not have product access permission'
					});
				} else {
					deferred.resolve(response);
				}
			}, function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.resetPassword = function (email) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'rest/externalapi/forgetpassword',
				data: email
				// headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		};

		service.logout = function () {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'rest/logout',
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