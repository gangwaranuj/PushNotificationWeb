angular.module('app').
    directive('multiSelect', function () {
        return {
            restrict: 'E',
            scope: {
                handler: '='
            },
            templateUrl: 'app/shared/directives/multiselect/multiSelectTemplate.html',
            link: function (scope, elem, attr) {

                scope.initTime = new Date().getTime();

                scope.options = [];

                scope.$watch(function () {
                    return scope.handler.options;
                }, function (newVal) {
                    scope.options = angular.copy(newVal);

                    if (scope.selectAllModel == true) {

                        scope.selectAll();
                    }
                });

                scope.$watch(function () {
                    return scope.handler.selectedOptions;
                }, function (newVal) {
                    scope.options = scope.options.map(function (opt) {

                        if (findInOptions(scope.handler.selectedOptions, opt[scope.getValueProp()])) {
                            opt.selected = true;
                        }
                        else {
                            opt.selected = false;
                        }
                        return opt;
                    });

                    //updated 9 Nov 2016
                    if (scope.handler.selectedOptions) {
                        if (scope.handler.selectedOptions.length !== scope.options.length || scope.handler.selectedOptions.length === 0) {
                            scope.selectAllModel = false;
                        }
                        else {
                            scope.selectAllModel = true;
                        }

                    }

                });

                scope.selectAll = function () {
                    if (scope.selectAllModel) {
                        scope.options.forEach(function (opt) {
                            opt.selected = true;
                        });
                    } else {
                        scope.options.forEach(function (opt) {
                            opt.selected = false;
                        });
                    }
                    scope.changeCheckBox();
                };

                scope.getDisplayProp = function () {
                    return scope.handler.displayProp;
                };
                scope.getValueProp = function () {
                    return scope.handler.valueProp;
                };

                scope.options = scope.options.map(function (opt) {

                    if (findInOptions(scope.handler.selectedOptions, opt[scope.getValueProp()])) {
                        opt.selected = true;
                    }
                    else {
                        opt.selected = false;
                    }
                    return opt;
                });

                scope.changeCheckBox = function () {
                    var selectedOptions = scope.options.filter(function (opt) {
                        return opt.selected;
                    });
                    scope.handler.selectedOptions = selectedOptions.map(function (opt) {
                        var optClone = angular.copy(opt);
                        delete optClone.selected;
                        return optClone;
                    });
                    //updated 9 Nov 2016
                    if (scope.handler.selectedOptions) {
                        if (scope.handler.selectedOptions.length !== scope.options.length) {
                            scope.selectAllModel = false;
                        }
                        else {
                            scope.selectAllModel = true;
                        }

                    }

                };

                function findInOptions(options, valuePropValue) {
                    return options.filter(function (opt) {
                        return opt[scope.getValueProp()] == valuePropValue;
                    })[0];
                }

                scope.getSelectedOptions = function () {
                    return scope.options.filter(function (opt) {
                        return opt.selected;
                    });
                };

                elem.find('ul').on('click', function (e) {
                    e.stopPropagation();
                });

            }
        }
    });
