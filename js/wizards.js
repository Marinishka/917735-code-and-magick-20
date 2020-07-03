'use strict';

window.wizards = (function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var createRundomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  return {
    createWizards: function () {
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
    }
  };
})();
