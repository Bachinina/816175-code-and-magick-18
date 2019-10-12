'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');
  var setupUserName = document.querySelector('.setup-user-name');

  // Настройка персонажа
  var wizardsCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardsEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardsFireball = document.querySelector('.setup-fireball-wrap');

  var wizardsCoatInput = document.querySelector('input[name="coat-color"]');
  var wizardsEyesInput = document.querySelector('input[name="eyes-color"]');
  var wizardsFireballInput = document.querySelector('input[name="fireball-color"]');

  wizardsCoat.addEventListener('click', function () {
    var color = window.utils.randomElement(window.wizardParameters.coatColors);
    wizardsCoat.style.fill = color;
    wizardsCoatInput.value = color;
  });

  wizardsEyes.addEventListener('click', function () {
    var color = window.utils.randomElement(window.wizardParameters.eyesColors);
    wizardsEyes.style.fill = color;
    wizardsEyesInput.value = color;
  });

  wizardsFireball.addEventListener('click', function () {
    var color = window.utils.randomElement(window.wizardParameters.fireballsColors);
    wizardsFireball.style.background = color;
    wizardsFireballInput.value = color;
  });

  // Валидация
  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Слишком короткое имя для этого парня!');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Нуу.. такое длинное имя - уже перебор');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Твой волшебник будет грустить без имени :(');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  // Отправка формы
  var URL = 'https://js.dump.academy/code-and-magick';

  var onLoad = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save('POST', URL, onLoad, window.error, new FormData(form));
  });
})();
