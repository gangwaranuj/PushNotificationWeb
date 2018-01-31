angular.module('app').directive('donutChart', function () {
    return {
        restrict: 'E',
        replace: true,
        template: "<div></div>",
        scope: {
            tid: '@',
            chartconfig: '=',
            chartHeight: '=',
            chartWidth: '='
        },
        link: function (scope, element, attrs) {
            element.attr('id', scope.tid);
            element.css('width', scope.chartWidth);
            element.css('height', scope.chartHeight)
            function process() {
                Highcharts.chart(scope.tid, scope.chartconfig);
            }
            scope.chartconfig.processWhenChange= function(){
                process();
            }
            process();
            scope.$watch(function(){
                return scope.chartconfig.series;
            },
             function (newval, oldval) {
                process();
            })
        }
    }
});