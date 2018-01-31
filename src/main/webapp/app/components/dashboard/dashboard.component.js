(function () {
    var app = angular.module('app');
    //app.value('platformTrendColor', { 'android': "#aac147", 'firefox': "#ffc200", 'chrome': "#3aa935", 'safari': "#00b9ee", 'opera': "#ff4a46" });
    app.value('platformDetail',
        {
            'opera': {
                'color': '#ff4a46',
                'icon': 'images/icons/Opera.png'
            },
            'android': {
                'color': '#aac147',
                'icon': 'images/icons/android.png'
            },
            'firefox': {
                'color': '#ffc200',
                'icon': 'images/icons/Firefox.png'
            },
            // 'safari': {
            //     'color': '#00b9ee',
            //     'icon': 'images/icons/safari-icon.png'
            // },
            'chrome': {
                'color': '#3aa935',
                'icon': 'images/icons/Chrome.png'
            }

        });
    app.component('dashboard', {
        bindings: {
        },
        templateUrl: 'app/components/dashboard/dashboard.html',
        controller: function () {
        }
    });
})();   