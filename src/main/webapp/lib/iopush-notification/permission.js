
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var nameOffset, verOffset;
var os_name = navigator.oscpu;
var hash = '';
var isMobile = false; //initiate as false
var globalUrl = "https://dev.iopushtech.com/";
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;



// In Opera 15+, the true version is after "OPR/" 
if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
    browserName = "Opera";
}
// In older Opera, the true version is after "Opera" or after "Version"
else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);

}
// trim the fullVersion string at semicolon/space if present
window.localStorage.setItem("browserName", browserName);
window.localStorage.setItem("isMobile", isMobile);
window.localStorage.setItem("os_name", os_name);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAiCdcPTBl-g_VHC-GA-OlkTVzcmkpCD6o",
    authDomain: "iosispush.firebaseapp.com",
    databaseURL: "https://iosispush.firebaseio.com",
    storageBucket: "iosispush.appspot.com",
    messagingSenderId: "445916585941"
};
firebase.initializeApp(config);

var requestURL = document.getElementById("myScript").getAttribute("src");

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

hash = getParameterByName("pid", requestURL);
var segmentId = getParameterByName("segmentId", requestURL);
segmentId = segmentId ? segmentId : 0;

//next use substring() to get querystring part of src
//var queryString = requestURL.substring(requestURL.indexOf("?") + 1, requestURL.length);

//Next split the querystring into array
//var params = queryString.split("&");
//console.log(params + '......');
//Next loop through params
// for (var i = 0; i < params.length; i++) {
//     var name = params[i].substring(0, params[i].indexOf("="));
//     hash = params[i].substring(params[i].indexOf("=") + 1, params[i].length);
// }

console.log('pid...' + hash);

// [END request_permission]
const messaging = firebase.messaging();
// [END get_messaging_object]
// IDs of divs that display Instance ID token UI or request permission UI.
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';
// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // [START_EXCLUDE]
            // Display new Instance ID token and clear UI of all previous messages.
            resetUI();
            // [END_EXCLUDE]
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
            //showToken('Unable to retrieve refreshed token ', err);
        });
});


messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    appendMessage(payload);
    // [END_EXCLUDE]
});
console.log('Requesting permission...');



function setTokenSentToServer(sent) {
    if (sent) {
        window.localStorage.setItem('sentToServer', 1);
    } else {
        window.localStorage.setItem('sentToServer', 0);
    }
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}
function isTokenSentToServer() {
    if (window.localStorage.getItem('sentToServer') == 1) {
        return true;
    }
    return false;
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
}
window.onload = function () {
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function (data) {
        if (xhr1.readyState == 4) {
            if (xhr1.status == 200) {
                var data = xhr1.responseText;
                data = JSON.parse(data);
                ip = data.ip;
            }
        }
    }
    xhr1.open('GET', 'https://jsonip.com', true);
    xhr1.send();
}

function resetUI() {

    var now = Date.now();
    var max = 100000;
    var min = 0;
    var url = window.location.hostname;
    var uniquee = new Date(now).getTime();
    var pid = "";
    var data = {};

    iopushToken = uniquee + '' + Math.floor(Math.random() * (max - min));
    //clearMessages();
    //showToken('loading...');
    console.log('loading...');
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    var xhr = new XMLHttpRequest();
    messaging.getToken()
        .then(function (currentToken) {
            if (currentToken) {
                if (location.protocol == "http:") {
                    window.open(locationUrl + "?segment=" + segmentId);
                }
                else {
                    if (isTokenSentToServer())
                        return;
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log('status send successfully');
                            result = (JSON.parse(this.responseText)).Options;
                            var notification = [];
                            var date = formatDate(new Date());
                            var i = 0;
                            if (result) {
                                if (result.length > 0) {
                                    // setTimeout(function () {
                                    for (var i = 0; i < result.length; i++) {
                                        (function (result, i) {
                                            setTimeout(function () {
                                                //console.log("result", result, i);
                                                notification.push(new Notification(result[i].title, {
                                                    icon: result[i].icon,
                                                    body: result[i].description,
                                                    data: result[i].url,
                                                    tag: result[i].welcome_name,
                                                }));
                                                var url1 = globalUrl + '/iopush/rest/externalapi/welcomeanalytics/' + result[i].welcome_name + '/' + date + '/' + 1 + '/' + 1;
                                                var xhttp1 = new XMLHttpRequest();
                                                xhttp1.open('GET', url1, true);
                                                xhttp1.send();
                                                notification[i].onclick = function (obj) {
                                                    var welcomeName = obj.currentTarget.tag;
                                                    var url2 = globalUrl + '/iopush/rest/externalapi/welcomeanalytics/' + welcomeName + '/' + date + '/' + 2 + '/' + 1;
                                                    var xhttp2 = new XMLHttpRequest();
                                                    xhttp2.open('GET', url2, true);
                                                    xhttp2.send();
                                                    window.open(obj.currentTarget.data);
                                                    obj.currentTarget.close();
                                                };
                                            }, 0 + (1000 * i));
                                        })(result, i);
                                    }
                                }
                                else {
                                    console.log("No Welcome Message Found");
                                }
                            }
                            else {
                                console.log("Error!!");
                            }

                        }
                    };
                    // Syntax : hosturl/{iopushToken}/{isMobile}/{currentToken}/{browser_name}/{os_language}/{ip}
                    var installationUrl = globalUrl + "iopush/rest/externalapi/subscriptionapi";
                    data['iopushToken'] = iopushToken;
                    data['isMobile'] = window.localStorage.getItem("isMobile");
                    data['currentToken'] = currentToken;
                    data['browser_name'] = window.localStorage.getItem("browserName");
                    data['os_language'] = String(navigator.language || navigator.userLanguage);
                    data['ip'] = ip;
                    data['os_name'] = encodeURI(navigator.platform);
                    data['hostName'] = window.location.hostname;
                    data['pid'] = hash;
                    data['segment_id'] = segmentId ? segmentId : 0;
                    xhr.responseType = 'text';
                    xhr.onload = function () {
                        result = xhr.responseText;
                        if (parseInt(JSON.parse(result).responseCode) === 200) {
                            localStorage.setItem('iopushToken', iopushToken);
                        }
                    };
                    xhttp.open("POST", installationUrl, true);
                    xhttp.send(JSON.stringify(data));

                    sendTokenToServer(currentToken);
                    //updateUIForPushEnabled(currentToken);
                }

            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
            }

        })
        .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            //showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });
}

var iopush = {
    nativePopUp: function () {
        // [START request_permission]
        messaging.requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                // [START_EXCLUDE]
                // In many cases once an app has been granted notification permission, it
                // should update its UI reflecting this.

                resetUI();

                // [END_EXCLUDE]
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });
    }
}

var xhr = new XMLHttpRequest();

xhr.open("GET", globalUrl + "iopush/rest/externalapi/autofillnotification?hash=" + hash, false);
xhr.send();
var customBtn = document.getElementById('btn');
if (customBtn)
    customBtn.style.display = 'none';
//console.log("xhr.status",xhr.status);
if (xhr.status == 200) {
    if (JSON.parse(xhr.response).Result == "Success") {
        if (JSON.parse(xhr.response).Record) {
            var response = JSON.parse(xhr.response).Record;
            locationUrl = response.websiteUrl;
            checkCookie();
        }
        else {
            iopush.nativePopUp();
        }
    }
    else {
        iopush.nativePopUp();
    }

}

function appendHtml(el, str) {
    var div = document.createElement('div');
    var customBtn = document.getElementById('btn');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
    if (customBtn && response.type != "button") {
        // if(!response.checkFlag)
        // {
        customBtn.style.display = 'none';
        // }
    }
    if (customBtn && response.type == "button") {
        if (response.buttonType == 'link') {
            customBtn.style.display = 'none';
        }
    }
}
function allowRedirection(url) {
    if (location.protocol == "http:") {
        window.open(url + "?segment=" + segmentId);

    }
    else {
        ioPopUpClosed();
        iopush.nativePopUp();

    }
    setCookie('btnClicked', 'Allow', 7);
    ioPopUpClosed();

}

function donotAllowRedirection() {
    setCookie("btnClicked", "Don't Allow", 7);
    ioPopUpClosed();
}

function setCookie(btnText, btnValue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = btnText + "=" + btnValue + ";" + expires + ";path=/";
}
function getCookie(btnText) {
    var name = btnText + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function ioPopUpClosed() {
    document.getElementById('customNotification').style.display = "none";
};

function checkCookie() {
    var btnClicked = getCookie("btnClicked");
    if (btnClicked == "") {
        if (response.type !== 'native') {
            if (response.checkFlag)
                setTimeout(function () { appendHtml(document.body, html); }, (response.delayTime * 1000));
            else
                setTimeout(function () { appendHtml(document.body, html); }, (0));
        }
        else {
            iopush.nativePopUp();
        }

    } else {
        console.log("Already Clicked");
    }
}
var cssString = '<style type="text/css" rel="stylesheet">@import url(https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i);.io-subs-box-content:after,.io-subs-btn-box,.io-subs-icon-box{clear:both}.io-subs-container{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.5);z-index:999999999;font-family:Lato!important}.io-subs-close-btn{width:18px;height:18px;position:absolute;top:4px;right:4px;border:0px solid #a9a9a9;background:url(https://www.iopushtech.com/iopush/images/icons/iopush-icons.png) -106px -77px;cursor:pointer}.io-subs-contents{width:auto}.io-text{text-align:center;margin-bottom:5px;width: 100%;white-space: normal;word-break: break-all;word-wrap: break-word;}.io-text-left{text-align:left;margin-bottom:5px;width: 100%;white-space: normal;word-break: break-word;word-wrap: break-word;}.io-subs-btn-box{text-align:center;display:table;margin:auto;padding-top:20px;min-width:210px}.io-subs-box-content:after,.io-subs-box-icon:after,.io-subs-box-native:before{display:block;content:""}.io-subs-btn-box button, .io-subs-btn-topline button {background:#dcdcdc;height:35px;padding:0 5px;text-align:center;min-width:100px;width:48.5%;margin:0;font-size:11.5px!important;float:left;border:0;}.io-subs-btn-box button:first-child{margin-right:5px}.io-subs-box{width:300px;min-height:100px;background-color:#fff;padding:30px 20px 20px;margin:5% auto 0;position:relative}.io-subs-box-content{width:100%}.io-subs-image-box{width:45px;height:45px;margin-right:10px;float:left}.io-subs-image-box img{max-width:45px;max-height:45px}.io-subs-box-txt{width:calc(100% - 57px);float:left}.io-subs-box-icon,.io-subs-overlay{width:300px;min-height:100px;background-color:#fff;padding:30px 20px 20px}.io-subs-overlay{margin:calc(25% - 100px) auto 0;position:relative}.io-subs-icon{position:absolute;right:30px;bottom:30px;height:auto}.io-subs-box-icon{position:relative}.io-subs-box-icon:after{position:absolute;bottom:-20px;right:15px;width:0;height:0;border-top:10px solid ' + response.popupBackgroundColor + '; border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid transparent}.io-subs-icon-img{width:45px;height:45px;max-width:45px;max-height:45px;float:right;border:2px solid #bdbdbd;padding:2px;margin-top:20px;background:#fff}.io-subs-box-native,.io-subs-mobile{min-height:100px;background-color:#fff;padding:30px 20px 20px}.io-subs-icon-img img{max-width:45px;max-height:45px}.io-subs-native{position:absolute;left:100px;top:10px;height:auto}.io-subs-box-native{width:300px;position:relative}.io-subs-box-native:before{position:absolute;top:-20px;left:10px;width:0;height:0;border-top:10px solid transparent;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid #dcdcdc}.io-subs-mobile{width:300px;margin:0 auto;position:absolute;position: absolute; bottom: 0;left:0;right:0}.io-subs-full-btn{display:block!important}.io-subs-full-btn::after{content:"";display:block;clear:both}.io-subs-full-btn button:first-child{width:calc(49% - 15px)!important;margin-right:15px!important}.io-subs-full-btn button:last-child{width:calc(49% - 10px)!important;margin-left:15px!important}.io-sidebar-container{width:40px;height:322px;overflow:hidden;position:absolute;top:0;bottom:0;right:0;margin:auto;z-index:99999999999999}.io-subs-sidebar{width:300px;height:300px;font-size: 14px;line-height: 14px;box-sizing: border-box;cursor:pointer;font-family: "Lato" !important;border-top-left-radius:10px;border-top-right-radius:10px;text-align:center;-ms-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);transform:rotate(-90deg);transform-origin:50%;-ms-transform-origin:50%;-o-transform-origin:50%;-webkit-transform-origin:50%;-moz-transform-origin:50%;top:400px;padding:0px 10px;}.io-subs-sidebar-box {display: table-cell;text-align: center;width: 100%; height: 40px;vertical-align: middle; margin: auto;min-width: 280px;} .io-subs-topline {position:absolute; left:7px; top:7px;right:7px;height: auto;}.io-subs-box-topline{width:auto;background-color:#ffffff;padding:15px 20px 15px;position: relative;}.io-subs-content-topline {float:left; width: calc(100% - 170px);margin-right: 20px;font-size: 14px;line-height: 27px;}.io-subs-btn-topline {float:left; width: 135px;min-width: 140px;}.io-subs-box-topline .io-subs-contents:after {content: "";display: block;clear: both;}.io-subs-box-topline .io-subs-close-btn {top: 0;bottom: 0;margin: auto; right: 10px;}.io-subs-btn-topline button {position: absolute;width: 140px;right: 40px;top: 0;bottom: 0;margin: auto;} @media(max-width:767px){.io-subs-container{overflow:auto;}.io-subs-overlay{margin: 58px auto 0;} .io-subs-box-icon, .io-subs-overlay,.io-subs-mobile,.io-subs-box-native,.io-subs-box {width: 280px;padding: 20px 10px 15px}.io-subs-full-btn button:first-child {width: calc(49% - 8px)!important;margin-right: 8px!important;} .io-subs-icon {right:15px;bottom:10px;} .io-subs-native{left: 10px;}.io-subs-box-native:before{left:55px;}}</style>'
// response.popupBackgroundColor;response.popupColor;response.allowBtnBackgroundColor;response.allowBtnColor;response.dontAllowBtnBackgroundColor;response.dontAllowBtnColor;

if (response && response.type == 'box') {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-box" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-subs-box-content">'
        + '<div class="io-subs-image-box">'
        + '<img src="' + response.logoPath + '" width="45">'
        + '</div>'
        + '<div class="io-subs-box-txt">'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.title + '</div>'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.message + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="io-subs-btn-box io-subs-full-btn">'
        + '<button style="color:' + response.allowBtnColor + ';background:' + response.allowBtnBackgroundColor + ';"  onclick="allowRedirection(response.websiteUrl)">' + response.allowText + ' </button>'
        + '<button style="color:' + response.dontAllowBtnColor + ';background:' + response.dontAllowBtnBackgroundColor + '"  onclick="donotAllowRedirection()">' + response.dontAllowText + ' </button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
else if (response && response.type == 'overlay') {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-overlay" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-text" style="color:' + response.popupColor + ';">' + response.title + ' </div>'
        + '<div class="io-text" style="color:' + response.popupColor + ';">' + response.message + '</div>'
        + '<div class="io-subs-btn-box">'
        + '<button style="color:' + response.allowBtnColor + ';background:' + response.allowBtnBackgroundColor + ' "  onclick="allowRedirection(response.websiteUrl)">' + response.allowText + '</button>'
        + '<button style="color:' + response.dontAllowBtnColor + '; background:' + response.dontAllowBtnBackgroundColor + '" onclick="donotAllowRedirection()"> ' + response.dontAllowText + ' </button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
else if (response && response.type == 'native') {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-native">'
        + '<div class="io-subs-box-native" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.title + ' </div>'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.message + '</div>'
        + '<div class="io-subs-btn-box">'
        + '<button  style="color:' + response.allowBtnColor + ';background:' + response.allowBtnBackgroundColor + '"   onclick="allowRedirection(response.websiteUrl)">' + response.allowText + '</button>'
        + '<button style="color:' + response.dontAllowBtnColor + ';background:' + response.dontAllowBtnBackgroundColor + ' " onclick="donotAllowRedirection()"> ' + response.dontAllowText + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
else if (response && response.type == 'icon') {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-icon">'
        + '<div class="io-subs-box-icon" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.title + ' </div>'
        + '<div class="io-text-left" style="color:' + response.popupColor + ';">' + response.message + '</div>'
        + '<div class="io-subs-btn-box">'
        + '<button  style="color:' + response.allowBtnColor + '; background:' + response.allowBtnBackgroundColor + '"  onclick="allowRedirection(response.websiteUrl)">' + response.allowText + '</button>'
        + '<button style="color:' + response.dontAllowBtnColor + ';background:' + response.dontAllowBtnBackgroundColor + ' " onclick="donotAllowRedirection()"> ' + response.dontAllowText + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="io-subs-icon-box">'
        + '<div class="io-subs-icon-img">'
        + '<img src="' + response.logoPath + '" width="45">'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
}
else if (response && response.type == "mobile") {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-mobile" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-text" style="color:' + response.popupColor + ';">' + response.title + ' </div>'
        + '<div class="io-text" style="color:' + response.popupColor + ';">' + response.message + '</div>'
        + '<div class="io-subs-btn-box io-subs-full-btn">'
        + '<button  style="color:' + response.allowBtnColor + ';background:' + response.allowBtnBackgroundColor + '"   onclick="allowRedirection(response.websiteUrl)">' + response.allowText + ' </button>'
        + '<button style="color:' + response.dontAllowBtnColor + '; background:' + response.dontAllowBtnBackgroundColor + '" onclick="donotAllowRedirection()"> ' + response.dontAllowText + ' </button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
}

else if (response && response.type == "sidebar") {
    var html = cssString + '<div class="io-sidebar-container" id="customNotification" onclick="allowRedirection(response.websiteUrl)">'
        + '<div class="io-subs-sidebar" style="color:' + response.allowBtnColor + '; background:' + response.allowBtnBackgroundColor + ';"><div class="io-subs-sidebar-box io-text">' + response.title + '</div></div>'
        + '</div>';

}

else if (response && response.type == "topline") {
    var html = cssString + '<div class="io-subs-container" id="customNotification">'
        + '<div class="io-subs-topline">'
        + '<div class="io-subs-box-topline" style="background:' + response.popupBackgroundColor + ';">'
        + '<div class="io-subs-close-btn" onclick="ioPopUpClosed()"></div>'
        + '<div class="io-subs-contents">'
        + '<div class="io-subs-content-topline io-text-left" style="color:' + response.popupColor + ';">' + response.title + '</div>'
        + '<div class="io-subs-btn-topline">'
        + '<button style="color:' + response.allowBtnColor + ';background:' + response.allowBtnBackgroundColor + '"   onclick="allowRedirection(response.websiteUrl)">' + response.allowText + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
}
else if (response && response.type == "button") {
    var html = "";
    if (document.getElementById('btn')) {
        var customBtn = document.getElementById('btn');
        if (customBtn && response) {
            if (response.buttonType == "link") {
                customBtn.style.display = 'none';
            }
            if (response.buttonType == "button") {
                customBtn.style.display = 'block';
                customBtn.innerHTML = response.allowText;
                customBtn.style.color = response.allowBtnColor;
                customBtn.style.background = response.allowBtnBackgroundColor;
            }
            else {
                customBtn.style.display = 'none';
            }

        }
    }
    if (document.getElementById('link')) {
        var customLink = document.getElementById('link');
        if (customLink && response) {
            if (response.buttonType == "link") {
                customLink.innerHTML = response.dontAllowText;
                customLink.style.color = response.dontAllowBtnColor;
            }
            else {
                customLink.style.display = 'none';
            }
        }
    }
}
else if (response && response.buttonType == "link") {
    var html = "";
}

