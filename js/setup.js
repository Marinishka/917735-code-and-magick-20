'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NameLength = {
  MAX: 25,
  MIN: 2
};
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var inputCoat = setup.querySelector('input[name="coat-color"]');
var inputEyes = setup.querySelector('input[name="eyes-color"]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var inputFireball = setup.querySelector('input[name="fireball-color"]');
var numberFireball = 1;
var numberCoat = 1;
var numberEyes = 1;

var createRundomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createWizards = function () {
  var wizards = [];
  var coatColorsCopy = COAT_COLORS.concat();
  var eyesColorsCopy = EYES_COLORS.concat();
  for (var i = 0; i < 4; i++) {
    var wizard = {};
    var wizardName = WIZARD_NAMES[createRundomNumber(0, WIZARD_NAMES.length - 1)];
    wizard.name = wizardName;
    WIZARD_NAMES.splice(WIZARD_NAMES.indexOf(wizardName), 1);
    var wizardLastName = WIZARD_LAST_NAMES[createRundomNumber(0, WIZARD_LAST_NAMES.length - 1)];
    wizard.lastName = wizardLastName;
    WIZARD_LAST_NAMES.splice(WIZARD_LAST_NAMES.indexOf(wizardLastName), 1);
    var coatColor = coatColorsCopy[createRundomNumber(0, coatColorsCopy.length - 1)];
    wizard.coatColor = coatColor;
    coatColorsCopy.splice(coatColorsCopy.indexOf(coatColor), 1);
    var eyesColor = eyesColorsCopy[createRundomNumber(0, eyesColorsCopy.length - 1)];
    wizard.eyesColor = eyesColor;
    eyesColorsCopy.splice(eyesColorsCopy.indexOf(eyesColor), 1);
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

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var changeFireballColor = function () {
  if (numberFireball === FIREBALL_COLORS.length) {
    numberFireball = 0;
  }
  wizardFireball.style.backgroundColor = FIREBALL_COLORS[numberFireball];
  numberFireball++;
  inputFireball.value = wizardFireball.style.backgroundColor;
};

var changeCoatColor = function () {
  if (numberCoat === COAT_COLORS.length) {
    numberCoat = 0;
  }
  wizardCoat.style.fill = COAT_COLORS[numberCoat];
  numberCoat++;
  inputCoat.value = wizardCoat.style.fill;
};

var changeEyesColor = function () {
  if (numberEyes === EYES_COLORS.length) {
    numberEyes = 0;
  }
  wizardEyes.style.fill = EYES_COLORS[numberEyes];
  numberEyes++;
  inputEyes.value = wizardEyes.style.fill;
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;
    if (valueLength < NameLength.MIN) {
      userNameInput.setCustomValidity('Ещё ' + (NameLength.MIN - valueLength) + ' симв.');
    } else if (valueLength > NameLength.MAX) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - NameLength.MAX) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  document.addEventListener('keydown', onPopupEscPress);

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  }, true);

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  }, true);

  wizardCoat.addEventListener('click', function () {
    changeCoatColor();
  });

  wizardEyes.addEventListener('click', function () {
    changeEyesColor();
  });

  wizardFireball.addEventListener('click', changeFireballColor);
};

var closePopup = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  wizardFireball.removeEventListener('click', changeFireballColor);
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
