'use strict';

(function () {
  var xhrFunc = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа - ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('проблема в соединении :(');
    });

    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: xhrFunc,
    save: xhrFunc
  };
})();
