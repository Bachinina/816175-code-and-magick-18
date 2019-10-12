'use strict';
(function () {
  window.error = function (error) {
    var errorBlock = document.createElement('div');
    errorBlock.style.background = 'red';
    errorBlock.style.color = 'white';
    errorBlock.style.textAlign = 'center';
    errorBlock.style.padding = '5px';
    errorBlock.textContent = 'Произошла ошибочка: ' + error;
    document.body.insertBefore(errorBlock, document.body.children[0]);
  };
})();
