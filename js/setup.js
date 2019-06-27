'use strict';

var WIZARD_COUNT = 4;
var USER_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var USER_SURENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var CLASS_WIZARD_COAT = 'wizard-coat';
var CLASS_WIZARD_EYES = 'wizard-eyes';
var CLASS_WIZARD_FIREBALL = 'setup-fireball';

var getRandomValue = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var wizardsProperties = [];
for (var i = 0; i < WIZARD_COUNT; i++) {
  wizardsProperties.push(
      {
        name: getRandomValue(USER_NAME) + ' ' + getRandomValue(USER_SURENAME),
        coatColor: getRandomValue(COAT_COLOR),
        eyesColor: getRandomValue(EYES_COLOR),
      }
  );
}

var createWizardElement = function (wizardsPropertiesArray, wizardTemplate, arrayIndex) {
  var newWizardElement = wizardTemplate.cloneNode(true);
  newWizardElement.querySelector('.setup-similar-label').textContent = wizardsPropertiesArray[arrayIndex].name;
  newWizardElement.querySelector('.wizard-coat').style = 'fill: ' + wizardsPropertiesArray[arrayIndex].coatColor;
  newWizardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizardsPropertiesArray[arrayIndex].eyesColor;
  return newWizardElement;
};

var getFragmentWithWizard = function () {
  var fragmentWithWizard = document.createDocumentFragment();
  for (var j = 0; j < WIZARD_COUNT; j++) {
    fragmentWithWizard.appendChild(createWizardElement(wizardsProperties, SIMILAR_WIZARD_TEMPLATE, j));
  }
  return fragmentWithWizard;
};

document.querySelector('.setup-similar-list').appendChild(getFragmentWithWizard());

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupPlayer = setup.querySelector('.setup-player');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var inputCoatColor = setup.querySelector('input[name=\'coat-color\']');
var inputEyesColor = setup.querySelector('input[name=\'eyes-color\']');
var inputFireballColor = setup.querySelector('input[name=\'fireball-color\']');

// Функция показывает Popup удаляя класс hidden и добавляет слушатель на нажатие клавиатуры
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupPlayer.addEventListener('click', processingClicksPlayerSettings);
};

// По клику на аватарку вызывает функцию открытия Popup
setupOpen.addEventListener('click', function () {
  openPopup();
});

// При фокусе аватарки и по нажатию клавиши Enter вызывается функция открытия PopUp
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Функция проверяет нажатую кнопку, если была нажата ESC, вызывает функцию закрытия окна
var onPopupEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) & (setupUserName !== document.activeElement)) {
    closePopup();
  }
};

// Функция прячет PopUp и удаляет слушатель событий клавиатуры
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupPlayer.removeEventListener('click', processingClicksPlayerSettings);
};

// Обработчик событий вызывает функцию закрытия Popup по клику на крестик
setupClose.addEventListener('click', function () {
  closePopup();
});

// Обработчик событий на крестике ловит нажатие клафиши и если это Enter, вызывается функция закрытия Popup
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Перехват и замена сообщений вилидации формы
setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

// Проверяем на какой объект был клик, и при совпадении вызываем нужную фунуцию
var processingClicksPlayerSettings = function () {
  var target = event.target;
  if (target.getAttribute('class') === CLASS_WIZARD_COAT) {
    changeNewCoatColor();
  } else if (target.getAttribute('class') === CLASS_WIZARD_EYES) {
    changeNewEyesColor();
  } else if (target.getAttribute('class') === CLASS_WIZARD_FIREBALL) {
    changeNewFireballColor();
  }
};

// Генерируем случайный цвет, перекрашиваем мантию и добавляем цвет в скрытое поле формы
var changeNewCoatColor = function () {
  var newCoatColor = getRandomValue(COAT_COLOR);
  wizardCoat.style = 'fill: ' + newCoatColor;
  inputCoatColor.value = newCoatColor;
};

// Генерируем случайный цвет, перекрашиваем глаза и добавляем цвет в скрытое поле формы
var changeNewEyesColor = function () {
  var newEyesColor = getRandomValue(EYES_COLOR);
  wizardEyes.style = 'fill: ' + newEyesColor;
  inputEyesColor.value = newEyesColor;
};

// Генерируем случайный цвет, перекрашиваем fireball и добавляем цвет в скрытое поле формы
var changeNewFireballColor = function () {
  var newFireballColor = getRandomValue(FIREBALL_COLOR);
  fireball.style.backgroundColor = newFireballColor;
  inputFireballColor.value = newFireballColor;
};