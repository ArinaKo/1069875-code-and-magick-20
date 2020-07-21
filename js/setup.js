'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userSetup = document.querySelector('.setup');
userSetup.classList.remove('hidden');

var similarListElement = userSetup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


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

userSetup.querySelector('.setup-similar').classList.remove('hidden');
