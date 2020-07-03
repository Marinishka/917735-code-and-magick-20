'use strict';

window.setup = (function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizards = window.wizards.createWizards();

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
      window.changeColors.changeCoatColor();
    });

    wizardEyes.addEventListener('click', function () {
      window.changeColors.changeEyesColor();
    });

    wizardFireball.addEventListener('click', window.changeColors.changeFireballColor);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    wizardFireball.removeEventListener('click', window.changeColors.changeFireballColor);
    userDialog.removeAttribute('style');
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
})();
