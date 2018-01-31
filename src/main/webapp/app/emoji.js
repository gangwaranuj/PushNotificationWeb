(function () {
    angular.module('app').factory('emoji', ['$cookies', '$q', function ($cookies, $q) {
        // Initializes and creates emoji set from sprite sheet
        window.emojiPicker = new EmojiPicker({
            emojiable_selector: '[data-emojiable=true]',
            assetsPath: 'lib/ng-emojis/lib/img/',
            popupButtonClasses: 'io-icon io-smily select-smily'
        });
        // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
        // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
        // It can be called as many times as necessary; previously converted input fields will not be converted again
        window.emojiPicker.discover();
        return window.emojiPicker;
    }]);
})();

  
  
