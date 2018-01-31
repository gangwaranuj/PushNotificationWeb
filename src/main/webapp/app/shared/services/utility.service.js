(function () {
    angular.module('app').factory('utilitySrvc', ['$q', '$cookies', function ($q, $cookies) {
        var response;
        var service = {};

        //it will return date in YYYY-MM-dd format
        service.getDateYYYYMMDD = function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        };

        //it will return time in HH:MM:SS format
        service.getTimeNow = function timeNow() {
            var d = new Date();//moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss');
            d.setMinutes(d.getMinutes() + 5);
            var h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
                m = ((d.getMinutes()) < 10 ? '0' : '') + d.getMinutes();
            return (h + ':' + m + ':00');
        };

        //it will return time in HH:MM:SS format
        service.getTimeNowOfTimeZone = function timeNow() {

            var d = new Date(moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss'));//moment.tz($cookies.get('timezone')).format('YYYY-MM-DD HH:mm:ss');
            d.setMinutes(d.getMinutes() + 5);
            var h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
                m = ((d.getMinutes()) < 10 ? '0' : '') + d.getMinutes();
            return (h + ':' + m + ':00');

            // var d = moment.tz($cookies.get('timezone')).format('HH:mm:ss');
            // var hms=d.split(':');           
            // return (hms[0] + ':' + hms[1] + ':00');
        };

  //it will return date time in YYYY-MM-dd HH:MM:SS EX-2016-10-07T12:30:00
        service.getDate = function (datetime) {
            //Here T means Tab or space.it is for java only
            var dt;
            var sd = new Date(datetime.toString());
            dt = sd.getFullYear() +
                "-" + (String(sd.getMonth() + 1).length == 1 ? '0' + (sd.getMonth() + 1) : (sd.getMonth() + 1)) +
                "-" + (String(sd.getDate()).length == 1 ? ("0" + sd.getDate()) : sd.getDate()) 
                + " "               
                + (String(sd.getHours()).length == 1 ? '0' + sd.getHours() : sd.getHours())
                + ":"
                + (String(sd.getMinutes()).length == 1 ? '0' + sd.getMinutes() : sd.getMinutes())
                + ":"
                + (String(sd.getSeconds()).length == 1 ? '0' + sd.getSeconds() : sd.getSeconds())
                ;
            return dt;

        };


        //it will return date time in YYYY-MM-dd HH:MM:SS EX-2016-10-07T12:30:00
        service.getDateFormat = function (datetime) {
            //Here T means Tab or space.it is for java only
            var dt;
            var sd = new Date(datetime.toString());
            dt = sd.getFullYear() +
                "-" + (String(sd.getMonth() + 1).length == 1 ? '0' + (sd.getMonth() + 1) : (sd.getMonth() + 1)) +
                "-" + (String(sd.getDate()).length == 1 ? ("0" + sd.getDate()) : sd.getDate()) +
                "T"
                + (String(sd.getHours()).length == 1 ? '0' + sd.getHours() : sd.getHours())
                + ":"
                + (String(sd.getMinutes()).length == 1 ? '0' + sd.getMinutes() : sd.getMinutes())
                + ":"
                + (String(sd.getSeconds()).length == 1 ? '0' + sd.getSeconds() : sd.getSeconds())
                ;
            return dt;

        };

        service.findEmojiTxtLength=function(e,length,emoji,headline){
                e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                text=emoji.colonToUnicode(text);
                var len=headline?headline.length:0;
                text=text.substring(0,length-len);
                document.execCommand("insertHTML", false, emoji.unicodeToImage(text));
        }
        return service;

    }]);

})();