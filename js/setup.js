'use strict';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');

document.querySelector('.setup-similar').classList.remove('hidden');

var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Данные
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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

// Обработка событий

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (setupUserName !== document.activeElement) {
      closeSetup();
    }
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

// Открытие попапа
setupOpen.addEventListener('click', function () {
  openSetup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

// Закрытие попапа
setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

// Настройка персонажа
var wizardsCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardsEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardsFireball = document.querySelector('.setup-fireball-wrap');

var wizardsCoatInput = document.querySelector('input[name="coat-color"]');
var wizardsEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardsFireballInput = document.querySelector('input[name="fireball-color"]');

wizardsCoat.addEventListener('click', function () {
  var color = randomElement(coatColors);
  wizardsCoat.style.fill = color;
  wizardsCoatInput.value = color;
});

wizardsEyes.addEventListener('click', function () {
  var color = randomElement(eyesColors);
  wizardsEyes.style.fill = color;
  wizardsEyesInput.value = color;
});

wizardsFireball.addEventListener('click', function () {
  var color = randomElement(fireballsColors);
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
