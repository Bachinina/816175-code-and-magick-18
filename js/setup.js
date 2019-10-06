'use strict';
(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');

  var setupDefaultCoords = {
    top: '80px',
    left: '50%'
  };

  // Обработка событий
  var onSetupEscPress = function (evt) {
    window.utils.isEscKeyCode(evt, function () {
      if (setupUserName !== document.activeElement) {
        closeSetup();
      }
    });
  };

  var openSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
    upload.addEventListener('mousedown', onUploadMouseDown);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    upload.removeEventListener('mousedown', onUploadMouseDown);
    setup.style.left = setupDefaultCoords.left;
    setup.style.top = setupDefaultCoords.top;
  };

  // Открытие попапа
  setupOpen.addEventListener('click', function () {
    openSetup();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterKeyCode(evt, openSetup);
  });

  // Закрытие попапа
  setupClose.addEventListener('click', function () {
    closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEscKeyCode(evt, closeSetup);
  });

  // Перетаскивание окна настройки персонажа
  var upload = document.querySelector('.upload');

  var onUploadMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var boolean = false;

    var onUploadMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      boolean = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onUploadMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onUploadMouseMove);
      document.removeEventListener('mouseup', onUploadMouseUp);

      if (boolean) {
        var onUploadClick = function (preventEvt) {
          preventEvt.preventDefault();
          upload.removeEventListener('click', onUploadClick);
        };
        upload.addEventListener('click', onUploadClick);
      }
    };

    document.addEventListener('mousemove', onUploadMouseMove);
    document.addEventListener('mouseup', onUploadMouseUp);
  };
})();
