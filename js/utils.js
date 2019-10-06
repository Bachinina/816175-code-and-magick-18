'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    // Поиск максимального значения в массиве
    getMaxValue: function (arr) {
      if (arr.length !== 0) {
        var maxValue = arr[0];
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] > maxValue) {
            maxValue = arr[j];
          }
        }
      }
      return maxValue;
    },

    // Выбор случайного элемента массива
    randomElement: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return (arr[randomIndex]);
    },

    isEscKeyCode: function (evt, funct) {
      if (evt.keyCode === ESC_KEYCODE) {
        funct();
      }
    },

    isEnterKeyCode: function (evt, funct) {
      if (evt.keyCode === ENTER_KEYCODE) {
        funct();
      }
    }
  };
})();
