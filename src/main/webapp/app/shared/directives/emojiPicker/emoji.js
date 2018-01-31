angular.module('app').
    directive('emojiPicker', function ($compile, emoji) {
        return {
            controllerAs: 'vm',
            controller: function ($scope,$window) {
                $window.emojiPicker = new EmojiPicker({
                    emojiable_selector: '[data-emojiable=true]',
                    assetsPath: 'lib/ng-emojis/lib/img/',
                    popupButtonClasses: 'io-icon io-smily select-smily'
                });
                $window.emojiPicker.discover();
            },
            scope: {
                maxlimit: "@",
                headline: "=ngModel"
            },
            //replace: true,
            link: function (scope, elem, attr) {
                var length = scope.maxlimit;
                scope.headline = '';
                elem.siblings(".emoji-wysiwyg-editor").on("DOMSubtreeModified", function (evt) {
                    var allImg = $(this).find(".img");
                    var innrText = $(this).text();
                    var emojiInnerLength = (allImg.length) + innrText.length;
                    if (emojiInnerLength > length) {
                        $(this).html(scope.oldvalueTitle);
                        scope.headline = scope.headline.substring(0, length);
                        $(this).blur();
                    }
                    else {
                        scope.oldvalueTitle = $(this).html();
                        scope.headline = scope.headline ? scope.headline.substring(0, length) : "";
                    }
                });

                function placeCaretAtEnd(el) {
                    if (typeof window.getSelection != "undefined"
                        && typeof document.createRange != "undefined") {
                        var range = document.createRange();
                        range.selectNodeContents(el);
                        range.collapse(false);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (typeof document.body.createTextRange != "undefined") {
                        var textRange = document.body.createTextRange();
                        textRange.moveToElementText(el);
                        textRange.collapse(false);
                        textRange.select();
                    }
                }

                var findEmojiTxtLength = function (e, length, headline) {
                    e.preventDefault();
                    var text = e.clipboardData.getData("text/plain");
                    text = emoji.colonToUnicode(text);
                    var len = headline ? headline.length : 0;
                    text = text.substring(0, length - len);
                    document.execCommand("insertHTML", false, emoji.unicodeToImage(text));
                }
                elem.siblings(".emoji-wysiwyg-editor").on("scroll", function (evt) {
                    placeCaretAtEnd(this);
                });


                elem.siblings(".emoji-picker-icon").click(function () {
                    var elemId = $(this).attr("data-id");
                    $(".emoji-menu[data-id!='" + elemId + "']").hide();
                })

                elem.siblings(".emoji-wysiwyg-editor")[0].addEventListener("paste", function (evt) {
                    findEmojiTxtLength(evt, length, scope.headline);
                    this.blur();
                });
            },
        }
    });
