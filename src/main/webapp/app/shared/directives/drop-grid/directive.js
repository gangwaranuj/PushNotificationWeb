(function () {
    var app = angular.module('app');
    app.directive('dropGridOndemand', function ($timeout, fileReader,$uibModal) {
        return {
            restrict: 'E',
            scope: {
                image: '='
            },
            templateUrl: 'app/shared/directives/drop-grid/template.html',
            link: function (scope, element, attribute) {

                function shuffle(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }

                var preImages = [
                    { imageSrc: 'images/png/badge.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/badge-1.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/box.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/cash-register.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/computer.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/credit-card.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/delivery-truck.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/gift.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/hanger.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/mobile-phone.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/padnote.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/price-tag.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/shop.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/shopping-bag.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/shopping-basket.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/shopping-cart.png', imgtype: 'pre' },
                    { imageSrc: 'images/png/trolley.png', imgtype: 'pre' }
                ];

                scope.images = preImages.slice(0, 11);

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

                    var fileselect = $id("fileselect3"),
                        filedrag = $id("filedrag"),
                        submitbutton = $id("submitbutton3");

                    // file select
                    fileselect.addEventListener("change", FileSelectHandler, false);

                    // is XHR2 available?
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {

                        // file drop
                        filedrag.addEventListener("dragover", FileDragHover, false);
                        filedrag.addEventListener("dragleave", FileDragHover, false);
                        filedrag.addEventListener("drop", FileSelectHandler, false);
                        filedrag.style.display = "block";

                        // remove submit button
                        submitbutton.style.display = "none";
                    }

                }

                // file drag hover
                function FileDragHover(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.target.className = (e.type == "dragover" ? "hover" : "");
                }
                scope.messageBox = function (confirmationMessage) {
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
                        size: 'md',
                        resolve: {
                            confirmationMessage: function () {
                                return confirmationMessage;
                            }
                        }
                    });
                };
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
                    FileDragHover(e);
                    // fetch FileList object
                    var files = e.target.files || e.dataTransfer.files;


                    if (files[0]) {
                        var fileSize = formatBytes(files[0].size);
                        //console.log(fileSize);
                        if (!(fileSize.size.indexOf('Bytes') > -1 || fileSize.size.indexOf('KB') > -1 || fileSize.size.indexOf('MB') > -1)) {
                            scope.messageBox("Image size should be equal or less than 1 MB.");
                               $('#fileselect3').val('');
                            return;
                        } else if (fileSize.size.indexOf('MB') > -1 && fileSize.fileSize > 1) {
                            scope.messageBox("Image size should be equal or less than 1 MB.");
                               $('#fileselect3').val('');
                            return;
                        }
                    }



                    $timeout(function () {
                        if (files.length > 0) {

                            scope.images.push(files[0]);
                        }

                        fileReader.readAsDataUrl(scope.images[scope.images.length - 1], scope).then(function (result) {
                            scope.images[scope.images.length - 1].imageSrc = result;
                            scope.images[scope.images.length - 1].imgtype = 'custom';
                            scope.selectImage(scope.images[scope.images.length - 1]);
                        });


                    }, 0);
                }

                scope.showUploadControl = function () {

                    if (scope.images[scope.images.length - 1].imgtype === 'custom') {
                        return false;
                    } else {
                        return true;
                    }
                };

                scope.uploadFromButton = function () {
                    $('#fileselect3').click();
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
                    scope.image = "";
                    $('#fileselect3').val('');
                    // prefix="test1";

                }

            }
        }
    });
})();