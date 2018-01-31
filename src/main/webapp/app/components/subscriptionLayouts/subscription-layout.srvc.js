(function () {
    angular.module('app').factory('subscriptionLayoutSrvc', ['$http', '$q', function ($http, $q) {
        var response;
        var service = {};
        //service.layoutDetails={};
        service.defaultLayoutDetails = function () {
            return {
                logoPath: "",
                type: "box",
                delayTime: 0,
                popupBackgroundColor: "#ffffff",
                popupColor: "#28282d",
                allowBtnBackgroundColor: "#eeeeee",
                allowBtnColor: "#28282d",
                dontAllowBtnBackgroundColor: "#eeeeee",
                dontAllowBtnColor: "#28282d",
                title: "",
                message: "",
                allowText: "",
                dontAllowText: "",
                checkFlag: false,
                customNotificationId: 0
            }
        }

        // var savedData = {};

        // service.setSubcriptionLoayout = function (data) {

        //     savedData = data;
        // };

        //   service.getSubcriptionLoayout = function () {

        //   return   savedData;
        // };


        return service;
    }]);
})();