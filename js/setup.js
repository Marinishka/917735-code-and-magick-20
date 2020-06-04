'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

userDialog.classList.remove('hidden');

var createRundomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {};
    var wizardName = WIZARD_NAMES[createRundomNumber(0, WIZARD_NAMES.length - 1)];
    wizard.name = wizardName;
    WIZARD_NAMES.splice(WIZARD_NAMES.indexOf(wizardName), 1);
    var wizardLastName = WIZARD_LAST_NAMES[createRundomNumber(0, WIZARD_LAST_NAMES.length - 1)];
    wizard.lastName = wizardLastName;
    WIZARD_LAST_NAMES.splice(WIZARD_LAST_NAMES.indexOf(wizardLastName), 1);
    var coatColor = COAT_COLORS[createRundomNumber(0, COAT_COLORS.length - 1)];
    wizard.coatColor = coatColor;
    COAT_COLORS.splice(COAT_COLORS.indexOf(coatColor), 1);
    var eyesColor = EYES_COLORS[createRundomNumber(0, EYES_COLORS.length - 1)];
    wizard.eyesColor = eyesColor;
    EYES_COLORS.splice(EYES_COLORS.indexOf(eyesColor), 1);
    wizards[i] = wizard;
  }
  return wizards;
};

var wizards = createWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
