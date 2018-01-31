angular.module('app').directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                //return undefined;
                 return "";
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


angular.module('app').directive('validfile', function() {

    var validFormats = ['jpg', 'gif'];
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$validators.validFile = function() {
                elem.on('change', function () {
                   var value = elem.val(),
                       ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();   

                   return validFormats.indexOf(ext) !== -1;
                });
           };
        }
    };
});