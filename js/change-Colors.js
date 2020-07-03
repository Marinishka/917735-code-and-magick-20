'use strict';

window.changeColors = (function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var setup = document.querySelector('.setup');
  var inputCoat = setup.querySelector('input[name="coat-color"]');
  var inputEyes = setup.querySelector('input[name="eyes-color"]');
  var inputFireball = setup.querySelector('input[name="fireball-color"]');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var numberFireball = 1;
  var numberCoat = 1;
  var numberEyes = 1;

  return {
    changeFireballColor: function () {
      if (numberFireball === FIREBALL_COLORS.length) {
        numberFireball = 0;
      }
      wizardFireball.style.backgroundColor = FIREBALL_COLORS[numberFireball];
      inputFireball.value = FIREBALL_COLORS[numberFireball];
      numberFireball++;
    },

    changeCoatColor: function () {
      if (numberCoat === COAT_COLORS.length) {
        numberCoat = 0;
      }
      wizardCoat.style.fill = COAT_COLORS[numberCoat];
      numberCoat++;
      inputCoat.value = wizardCoat.style.fill;
    },

    changeEyesColor: function () {
      if (numberEyes === EYES_COLORS.length) {
        numberEyes = 0;
      }
      wizardEyes.style.fill = EYES_COLORS[numberEyes];
      numberEyes++;
      inputEyes.value = wizardEyes.style.fill;
    }
  };
})();
