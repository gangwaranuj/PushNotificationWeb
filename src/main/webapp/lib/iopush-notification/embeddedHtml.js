

var xhr = new XMLHttpRequest();

xhr.open("GET", "rest/custom/autofillnotification", false);
xhr.send();
//console.log("xhr.status",xhr.status);
if(xhr.status == 200)
{
    var response = JSON.parse(xhr.response).Record;
    checkCookie();
}

function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
        while (div.children.length > 0) {
                el.appendChild(div.children[0]);
        }
}
function allowRedirection(url){  
    window.open(url);
    setCookie('btnClicked','Allow',7);
    document.getElementById('customNotification').style.display = "none";
}

function donotAllowRedirection(){  
    setCookie("btnClicked","Don't Allow",7);
    document.getElementById('customNotification').style.display = "none";
}

function setCookie(btnText,btnValue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = btnText + "=" + btnValue + ";" + expires + ";path=/";
}
function getCookie(btnText) {
    var name = btnText + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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
function popUpClosed()
{
    document.getElementById('customNotification').style.display = "none";
};

function checkCookie() {
    var btnClicked=getCookie("btnClicked");
    if (btnClicked == "") {
        if(response.checkFlag == true)
            setTimeout(function(){appendHtml(document.body, html);},response.delayTime);
        else
            appendHtml(document.body, html);
       
    } else {
        console.log("Already Clicked");
    }
}
// response.popupBackgroundColor;response.popupColor;response.allowBtnBackgroundColor;response.allowBtnColor;response.dontAllowBtnBackgroundColor;response.dontAllowBtnColor;
var html = '<div class="" style="position:absolute; width: 320px; top:15%; left:0; right:0; margin: auto; padding: 15px;border: 2px solid #dcdcdc; border-radius:5px; z-index: 999999999999999;font-family: Arial,sans-serif; font-size: 14px;box-shadow: 0 0 15px 0px rgba(0,0,0,0.8);-webkit-transition: all 1s ease;-moz-transition: all 1s ease;-o-transition: all 1s ease;-ms-transition: all 1s ease;transition: all 1s ease;background-color: ' + response.popupBackgroundColor + '" id="customNotification">'
		   + '<div id="" style="position: absolute; right: -20px; top: -20px;background: #fff; border:1px solid #ccc; border-radius: 3px; padding: 5px;line-height: 8px;font-size: 12px; cursor:pointer;"><span id="" onclick="popUpClosed()">X</span></div>'
		   + '<div><div class="notify-img-box" style="width: 50px;float: left;">'
		   + '<div class="preview-imgbox-box" style="background: transparent;width: 50px;height: 50px;position: relative; ">'
		   + '<img src="' + response.logoPath + '" style="max-width: 50px;max-height: 50px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"><br>'
		   + '</div></div>'
		   + '<div class="notify-url-box" style="padding-left: 15px;width: calc(100% - 90px);float: left;">'
		   + '<p class="ng-binding" style="max-width: 315px;margin-top:0;margin-bottom:10px;width: 100%;overflow: hidden;text-overflow: ellipsis;line-height: 16px;white-space: nowrap;border: 0;background: transparent;color: ' + response.popupColor +';">'+ response.title +'</p>'
		   + '<p class="ng-binding" style="max-width: 315px;margin-top:0;margin-bottom:10px;width: 100%;overflow: hidden;text-overflow: ellipsis;line-height: 16px;white-space: nowrap;border: 0;background: transparent;color: ' + response.popupColor +';">'+ response.message +'</p>'
		   + '</div></div>'
		   + '<div class="subsc-prv-btn-box" style="text-align: center;display: table;margin: auto;min-width: 210px;padding-top: 15px;clear: both;">'
		   + '<button style="margin-top: 0;background: ' + response.allowBtnBackgroundColor + ';height: 35px;padding: 0 13px;min-width: 100px;margin: 0 5px;float: left;border:0;cursor:pointer;color: ' + response.allowBtnColor + '" class="ng-binding" onclick="allowRedirection(response.websiteUrl)">' + response.allowText + '</button>'
		   + '<button style="margin-top: 0;background: ' + response.dontAllowBtnBackgroundColor + ';height: 35px;padding: 0 13px;min-width: 100px;margin: 0 5px;border:0;cursor:pointer;float: left;color: ' + response.dontAllowBtnColor + '" class="ng-binding" class="ng-binding" onclick="donotAllowRedirection()">' + response.dontAllowText + '</button>'
		   + '</div><div>';

checkCookie();