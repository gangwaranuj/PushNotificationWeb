(function () {
    var app = angular.module('app');
    app.directive('profileimg', function ($timeout, fileReader, $uibModal, $cookies) {
        return {
            restrict: 'E',
            scope: {
                image: '=',
                images: '=',
                remove: '&',
                showremove: '='
            },
            templateUrl: 'app/components/profile/uploadPhoto/setProfileImg/template.html',
            link: function (scope, element, attribute) {

                var s = scope.images;
                // getElementById
                function $id(id) {
                    return document.getElementById(id);
                }


                // call initialization file
                if (window.File && window.FileList && window.FileReader) {
                    Init();
                }

                //
                // initialize
                function Init() {

                    var fileselect = $id("fileselect"),
                        imgdrag = $id("imgdrag"),
                        submitbutton = $id("submitbutton");

                    // file select
                    fileselect.addEventListener("change", FileSelectHandler, false);

                    // is XHR2 available?
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {

                        // file drop
                        imgdrag.addEventListener("dragover", imgdragHover, false);
                        imgdrag.addEventListener("dragleave", imgdragHover, false);
                        imgdrag.addEventListener("drop", FileSelectHandler, false);
                        imgdrag.style.display = "block";

                        // remove submit button
                        submitbutton.style.display = "none";
                    }

                }

                // file drag hover
                function imgdragHover(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.target.className = (e.type == "dragover" ? "hover" : "");
                }

                function formatBytes(bytes, decimals) {
                    if (bytes == 0) return '0 Byte';
                    var k = 1000;
                    var dm = decimals + 1 || 3;
                    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                    var i = Math.floor(Math.log(bytes) / Math.log(k));
                    var output = {};
                    output.fileSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
                    output.size = sizes[i];
                    return output;
                }

                // file selection
                function FileSelectHandler(e) {
                    // cancel event and hover styling
                    imgdragHover(e);
                    // fetch FileList object
                    var files = e.target.files || e.dataTransfer.files;

                    if (files[0]) {

                        var fileSize = formatBytes(files[0].size);
                        //console.log(fileSize);
                        var validFormats = ['jpg', 'gif', 'png', 'tif'];
                        //var fileName=files[0].name;
                        var value = files[0].name,
                            ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
                        if (validFormats.indexOf(ext) === -1) {
                            scope.messageBox("Invalid image.");
                            $('#fileselect').val('');
                            scope.image = undefined;
                            return;
                        }
                        else if (!(fileSize.size.indexOf('Bytes') > -1 || fileSize.size.indexOf('KB') > -1)) {
                            scope.messageBox("Image size should be less or equal to 500 KB.");
                            return;
                        } else if (fileSize.size.indexOf('KB') > -1 && fileSize.fileSize > 500) {
                            scope.messageBox("Image size should be less or equal to 500 KB.");
                            return;
                        }
                    }
                    $timeout(function () {
                        if (files.length > 0) {
                            scope.images = [];
                            scope.images.push(files[0]);
                        }

                        fileReader.readAsDataUrl(scope.images[scope.images.length - 1], scope).then(function (result) {
                            scope.images[scope.images.length - 1].imageSrc = result;
                            scope.images[scope.images.length - 1].imgtype = 'custom';
                            scope.selectImage(scope.images[scope.images.length - 1]);
                            // $id("imgdrag").style.height = "426px";
                            //$id("outerDiv").className += " mrg-bot-20";
                        });


                    }, 0);
                }

                scope.showUploadControl = function () {
                    if (scope.images.length == 0)
                        return true;
                    else {
                        if (scope.images[scope.images.length - 1].imgtype === 'custom') {
                            return false;
                        } else {
                            return true;
                        }
                    }
                };

                scope.uploadFromButton = function () {
                    $('#fileselect').click();
                };

                function convertImageToFile(url) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'blob:http://' + window.location.host + '/' + url, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function (e) {
                        if (this.status == 200) {
                            var myBlob = this.response;
                            // myBlob is now the blob that the object URL pointed to.
                        }
                    };
                    xhr.send();
                }

                function toDataUrl(url, callback) {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'arraybuffer';
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            callback(reader.result);
                        };
                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', 'blob:http://' + window.location.host + '/' + url);
                    xhr.send();
                }

                function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function () {
                        var canvas = document.createElement('CANVAS');
                        var ctx = canvas.getContext('2d');
                        var dataURL;
                        canvas.height = this.height;
                        canvas.width = this.width;
                        ctx.drawImage(this, 0, 0);
                        dataURL = canvas.toDataURL(outputFormat);
                        callback(dataURL);
                        canvas = null;
                    };
                    img.src = url;
                }


                scope.selectImage = function (image) {
                    scope.images.forEach(function (img) {
                        img.selected = false;
                    });

                    image.selected = true;

                    if (image.imgtype === "custom") {

                        scope.image = image.imageSrc;
                        // scope.showRemove=false;
                        // if(image.imageSrc.indexOf("images")===-1)
                        // 	{
                        // 	scope.showRemove=true;
                        // 	}

                    } else {
                        convertImgToDataURLviaCanvas('https://' + window.location.host + '/icmp/' + image.imageSrc, function (data) {

                            $timeout(function () {
                                scope.image = data;
                            }, 0);

                        });
                    }
                };

                scope.removeImage = function (image) {
                    var index = scope.images.indexOf(image);
                    scope.images.splice(index, 1);

                    // $id("imgdrag").style.height = "310px";
                    $id("outerDiv").className = "col-sm-12";
                    $id("imgdrag").className = "border-gray-dashed pdd-top-bot-30  mrg-bot-30 text-center";
                    $id("imgdrag").style = "position: relative; display: block;";

                    scope.image = "";
                    $('#fileselect').val('');
                    return;

                }

            },
            controller: function ($scope) {
                $scope.messageBox = function (confirmationMessage) {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/shared/templates/warning.html',
                        controller: ['$scope', '$uibModalInstance', '$state', 'confirmationMessage', '$timeout', function (modalScope, $uibModalInstance, $state, confirmationMessage, $timeout) {
                            modalScope.confirmationMessage = confirmationMessage;

                            modalScope.closeModal = function () {
                                $uibModalInstance.dismiss();
                            };

                        }
                        ],
                        backdrop: 'static',
                        size: 'sm',
                        windowClass: 'messages-sm-modal',
                        resolve: {
                            confirmationMessage: function () {
                                return confirmationMessage;
                            }
                        }
                    });
                };
            }
        }
    });
})();