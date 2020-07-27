'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userNameInput = document.querySelector('.setup-user-name');
var userWizard = document.querySelector('.setup-player');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = userWizard.querySelector('.setup-fireball-wrap');

var getRandomOption = function (options) {
  var i = Math.floor(Math.random() * options.length);
  return options[i];
};

var getWizards = function () {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: getRandomOption(WIZARD_NAMES) + ' ' + getRandomOption(WIZARD_SECOND_NAMES),
      coatColor: getRandomOption(WIZARD_COATS),
      eyesColor: getRandomOption(WIZARD_EYES)
    };
  }

  return wizards;
};

var wizards = getWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardsList = function (place, list) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    fragment.appendChild(renderWizard(list[i]));
  }

  place.appendChild(fragment);
};

renderWizardsList(similarListElement, wizards);

setup.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if ((evt.key === 'Escape') && (document.activeElement !== setup.querySelector('.setup-user-name'))) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('You shall not pass. State your name.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userWizardEyes.addEventListener('click', function () {
  var color = getRandomOption(WIZARD_EYES);
  userWizardEyes.style.fill = color;
  setup.querySelector('[name=eyes-color]').value = color;
});

userWizardCoat.addEventListener('click', function () {
  var color = getRandomOption(WIZARD_COATS);
  userWizardCoat.style.fill = color;
  setup.querySelector('[name=coat-color]').value = color;
});

userWizardFireball.addEventListener('click', function () {
  var color = getRandomOption(WIZARD_FIREBALL);
  userWizardFireball.style.background = color;
  setup.querySelector('[name=fireball-color]').value = color;
});
