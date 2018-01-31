(function () {
    var app = angular.module('app');
    app.component('codeImplementation', {
        bindings: {
        },
        templateUrl: 'app/components/codeImplementation/codeImplementation.html',
        controller:['$scope','$cookies','$location',function ($scope, $cookies,$location) {
            if ($cookies) {
                //var strDomain=$location.absUrl();
                  $scope.head="</head>";
                 $scope.currentHostURL=$location.protocol() + "://" + $location.host() ;//+ ":" + $location.port();
                userCookiedData = $cookies.get('userData') ? JSON.parse($cookies.get('userData')) : {};
                if (userCookiedData) {
                    //console.log("userCookiedData",userCookiedData);
                    $scope.pid = userCookiedData.pid;
                }
            }

            $scope.codeImpString = "(function(){\n  var iopush = document.createElement('script'); \n iopush_el = document.getElementsByTagName('script')[0]; \n iopush.async=false; \n iopush.src='"+$scope.currentHostURL+"/iopush.js'; \n iopush.id='iopush_messaging_script'; \n iopush_el.parentNode.insertBefore(iopush,iopush_el); \n iopush.onload = function(){  \n var s = document.createElement('script'),\n    el = document.getElementsByTagName('script')[0];\n  s.async = true;\n    s.src='"+$scope.currentHostURL+"/subscription/permission.js?rndstr='+Math.random()+'&pid="+$scope.pid+"';\n  s.id='myScript';   el.parentNode.insertBefore(s, el);}; })();\n</script>" ;   
        }]
    });
})();   