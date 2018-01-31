angular.module('app').directive('areaChart', function () {
    return {
        restrict: 'E',
        replace: true,
        template: "<div></div>",
        scope: {
            config: '=',
            next: '&',
            previous: '&',
            tid: '=',
            nextbtnid: '=',
            prevbtnid: '=',
            height: '=',
            width: '='

        },
        link: function (scope, element, attrs) {
            var chart;
            var process = function () {
                if (scope.config) {
                    element.attr('id', scope.tid);
                    element.width(scope.width);
                    element.height(scope.height);
                    $('#' + scope.tid).empty();
                    chart = new Highcharts.chart(scope.tid, scope.config);
                    // var svg = $('#' + scope.tid + ' svg')[0];
                    // if (svg.getAttribute('width'))
                    //     var w = svg.getAttribute('width').replace('px', '');
                    // if (svg.getAttribute('height'))
                    //     var h = svg.getAttribute('height').replace('px', '');

                    // svg.removeAttribute('width');
                    // svg.removeAttribute('height');

                    // svg.setAttribute('viewbox', '0 0 ' + w + ' ' + h);
                    // svg.setAttribute('preserveaspectratio', 'xminymin meet')

                    // $(svg).css('width', '100%').css('height', '100%').css('background-color', 'white');
                    // $('#' + scope.tid + ' .highcharts-container').css('width', element.width() + 20);
                    // $('#' + scope.prevbtnid).click(function (evt) {
                    //     evt.stopPropagation();
                    //     scope.previous();
                    // });
                    // $('#' + scope.nextbtnid).click(function (evt) {
                    //     evt.stopPropagation();
                    //     scope.next();
                    // });

                }

            };
            process();
            scope.$watch("config.series", function (loading) {
                process();
            });
            // scope.$watch("config.loading", function(loading) {
            // 	if (!chart) {
            // 		return;
            // 	}
            // 	if (loading) {
            // 		chart.showLoading();
            // 	} else {
            // 		chart.hideLoading();
            // 	}
            // });
        }
    }
});