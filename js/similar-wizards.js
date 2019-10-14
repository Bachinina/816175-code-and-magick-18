'use strict';
(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;

  var rankTheWizard = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var orderWizardNames = function (left, right) {
    if (left > right) {
      return 1;
    }
    if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var sortTheWizards = function () {
    renderWizards(wizards.sort(function (left, right) {
      var diff = rankTheWizard(right) - rankTheWizard(left);
      if (diff === 0) {
        diff = orderWizardNames(left.name, right.name);
      }
      return diff;
    }));
  };

  window.wizardCustomization.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    sortTheWizards();
  });

  window.wizardCustomization.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    sortTheWizards();
  });

  // Отрисовка волшебника по шаблону
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var renderWizard = function (wizardParams) {
    var wizardTemplate = template.cloneNode(true);

    wizardTemplate.querySelector('.setup-similar-label').textContent = wizardParams.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizardParams.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizardParams.colorEyes;

    return wizardTemplate;
  };

  // Добавление волшебников в разметку
  var wizardList = document.querySelector('.setup-similar-list');
  var renderWizards = function (arr) {
    wizardList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    return wizardList.appendChild(fragment);
  };

  // Загрузка данных с сервера
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var onLoad = function (response) {
    document.querySelector('.setup-similar').classList.remove('hidden');
    wizards = response;
    sortTheWizards();
  };

  window.backend.load('GET', URL, onLoad, window.error, null);
})();
