(function () {
    var app = angular.module('app');
    app.component('datetimepicker', {
        // defines a two way binding in and out of the component
        bindings: {
            datedata: "=",
            mindate: "=",
            maxdate: "=",
            format: "@",
            istime: "=",
            defttime: "=",
            msg: "@",
            calenderpos: "@"
        },
        //using following datepicker
        //https://github.com/Gillardo/bootstrap-ui-datetime-picker 
        // Load the template
        templateUrl: 'app/shared/components/datetimepicker/datetimepicker.html',
        controller: ['$scope', 'utilitySrvc','$rootScope', function ($scope, utilitySrvc,$rootScope) {
            var vm = this;
            
       vm.cls='input-group date input-group ' + vm.calenderpos;
            // vm.defaulttime="";
            //vm.time="00:01:00";


            // function timeNow() {
            //     var d = new Date(),
            //         h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
            //         m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            //     return (h + ':' + m +':00' );
            // }

            $rootScope.$watch('timezone', function (newVal, oldVal) {
                //	console.log('sidebar', 'oldval= ',oldVal, 'newval= ',newVal);
                //	var random = (new Date().getTime()).toString();
                //	$scope.imageSrc
                //   vm.imageSrc =   $rootScope.profileImg != "" ? $rootScope.profileImg + "?cb=" + random : "images/women-icon.png";
                //  vm.imageSrc =   $cookieStore.get('profilePath')!== "" ? $cookieStore.get('profilePath') + "?cb=" + random : "images/women-icon.png";
                if (vm.defttime === "start") {
                    vm.time = utilitySrvc.getTimeNowOfTimeZone();//OfTimeZone;utilitySrvc.getTimeNow();
                    vm.msg= vm.msg;//"start"
                }
                else if (vm.defttime === "end") {
                    vm.time = "23:59:00";
                    vm.msg= vm.msg;
                }


            });
            // if (vm.defttime === "start") {
            //     vm.time = utilitySrvc.getTimeNowOfTimeZone();//OfTimeZone;utilitySrvc.getTimeNow();
            // }
            // else if (vm.defttime === "end") {
            //     vm.time = "23:59:00";
            // }


            //vm.time="23:59:00";


            // global config picker
            //   vm.dtime="23:59:00";
            // vm.settime=vm.dtime;
            if (vm.mindate) {
                vm.mindate = new Date(vm.mindate.toDateString())
            }
            if (vm.maxdate) {
                vm.maxdate = new Date(vm.maxdate.toDateString())
            }
            //console.log(vm.mindate)
            vm.dateformat = vm.format;
            vm.picker6 = {
                date: new Date(),

                datepickerOptions: {
                    formatYear: 'yyyy',
                    showWeeks: false,
                    startingDay: 1,
                    minDate: vm.mindate,
                    maxDate: vm.maxdate
                },
                timepickerOptions: {
                    showMeridian: false
                },
                buttonBar: {
                    show: true,
                    now: {
                        show: false,
                        text: 'Now!'
                    },
                    today: {
                        show: false,
                        text: 'Today!'
                    },
                    clear: {
                        show: false,
                        text: 'Wipe'
                    },
                    date: {
                        show: true,
                        text: 'Date'
                    },
                    time: {
                        show: vm.istime,
                        text: 'Time'
                    },
                    close: {
                        show: true,
                        text: 'Close'
                    }
                }
            };

            vm.openCalendar = function (e, picker) {
                vm[picker].open = true;
            };
            // destroy watcher
            // $scope.$on('$destroy', function () {
            //     unwatchMinMaxValues();
            // });

        }],


        controllerAs: 'vm'
    });
})();