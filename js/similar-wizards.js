'use strict';
(function () {
  document.querySelector('.setup-similar').classList.remove('hidden');

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Генерация волшебников
  var generateWizards = function (quantity) {
    // Создаем пустой массив
    var wizardsArray = [];

    // Генерируем параметры заданного количества(quantity) волшебников
    for (var i = 0; i < quantity; i++) {
      wizardsArray[i] = {
        name: window.utils.randomElement(window.wizardParameters.firstNames) + ' ' + window.utils.randomElement(window.wizardParameters.lastNames),
        coatColor: window.utils.randomElement(window.wizardParameters.coatColors),
        eyesColor: window.utils.randomElement(window.wizardParameters.eyesColors)
      };
    }
    return wizardsArray;
  };

  // Отрисовка волшебника по шаблону
  var renderWizard = function (wizardParams) {
    var wizardTemplate = template.cloneNode(true);

    wizardTemplate.querySelector('.setup-similar-label').textContent = wizardParams.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizardParams.coatColor;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizardParams.eyesColor;

    return wizardTemplate;
  };

  // Добавление волшебников в разметку

  var renderWizards = function (quantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      var wizards = generateWizards(quantity);
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return document.querySelector('.setup-similar-list').appendChild(fragment);
  };

  renderWizards(4);
})();
