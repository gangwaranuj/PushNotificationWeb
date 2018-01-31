angular.module('app').filter('date2', function ($filter) {
    return function (input, format) {
        input = new Date(input);
        format = format || 'dd/MM/yyyy';
        return $filter('date')(input, format);
    }
}).filter('datetime2', function ($filter) {
    return function (input, format) {
        if(input==="")
        return "";
        input = new Date(input);
        format = format || 'dd/MM/yyyy HH:mm:ss';//short';
        return $filter('date')(input, format);
    }
});