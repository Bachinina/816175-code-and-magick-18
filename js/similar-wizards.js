'use strict';
(function () {
  document.querySelector('.setup-similar').classList.remove('hidden');

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Отрисовка волшебника по шаблону
  var renderWizard = function (wizardParams) {
    var wizardTemplate = template.cloneNode(true);

    wizardTemplate.querySelector('.setup-similar-label').textContent = wizardParams.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizardParams.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizardParams.colorEyes;

    return wizardTemplate;
  };

  // Добавление волшебников в разметку
  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      var wizard = window.utils.randomElement(arr);
      fragment.appendChild(renderWizard(wizard));
    }
    return document.querySelector('.setup-similar-list').appendChild(fragment);
  };

  // Загрузка данных с сервера
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var onLoad = function (response) {
    renderWizards(response);
  };

  window.backend.load(URL, onLoad, window.error);
})();
