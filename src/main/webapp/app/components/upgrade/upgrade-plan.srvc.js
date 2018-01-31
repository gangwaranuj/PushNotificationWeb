
(function () {
    angular.module('app').factory('paymentSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        service.selectPlan = function (plan) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'rest/paypalapi/createPayment',
                data: JSON.stringify(plan),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.paymentSuccess=function (orderId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/paypalapi/fetchPaymentInfo/'+orderId+'/',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.fetchUserPlans=function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'rest/paypalapi/fetchuserplan',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        return service;
    }]);
})();