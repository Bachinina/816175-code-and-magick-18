'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Данные
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];


// Выбор случайного элемента массива
var randomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return (arr[randomIndex]);
};


// Генерация волшебников
var generateWizards = function (quantity) {
  // Создаем пустой массив
  var wizardsArray = [];

  // Генерируем параметры заданного количества(quantity) волшебников
  for (var i = 0; i < quantity; i++) {
    wizardsArray[i] = {
      name: randomElement(firstNames) + ' ' + randomElement(lastNames),
      coatColor: randomElement(coatColors),
      eyesColor: randomElement(eyesColors)
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

// Добавление волшебников в разметку (способ №1)
var wizardsQuantity = 4;

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardsQuantity; i++) {
  var wizards = generateWizards(wizardsQuantity);
  fragment.appendChild(renderWizard(wizards[i]));
}

document.querySelector('.setup-similar-list').appendChild(fragment);


// Добавление волшебников в разметку (способ №2)

/*
var renderWizards = function (arr) {
    for (var i = 0; i < arr.length; i++) {

        var wizard = renderWizard(arr[i]);
        document.querySelector('.setup-similar-list').appendChild(wizard);

    };
};
renderWizards(generateWizards(4));
*/
