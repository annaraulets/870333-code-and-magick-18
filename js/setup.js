'use strict';

// Функция которая возвращает рандомный элемент из массива(пригодится)
(function () {
  var randomElement = function (array) {
    var randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber];
  };

  // Рандомный элемент и удаление из массива
  // var randomElementAndRemove = function (array) {
  //   var randomNumber = Math.floor(Math.random() * array.length);
  //   var result = array[randomNumber];

  //   array.splice(randomNumber, 1);

  //   return result;
  // };


  // Рандомный состав массива из массивов
  // var randomArray = function (array, resultLength) {
  //   var arrayCopy = array.slice();

  //   var result = [];
  //   for (var i = 0; i < resultLength; i++) {
  //     var x = randomElementAndRemove(arrayCopy); // результат вызова ф-ции, которая достает рандомный элемент и удаляет его из массива
  //     result.push(x);
  //   }
  //   return result;
  // };

  // Массивы
  // var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Функция которая возвращает рандомного Визарда
  // var randomWizard = function () {
  //   return {
  //     name: randomElement(wizardNames) + ' ' + randomElement(wizardSurnames),
  //     coatColor: randomElement(coatColors),
  //     eyesColor: randomElement(eyesColors)
  //   };
  // };

  // Функция создает массив Визардов
  // var createWizardsData = function (wizardsCount) {
  //   var result = [];

  //   for (var i = 0; i < wizardsCount; i++) {
  //     result.push(randomWizard());
  //   }

  //   return result;
  // };

  // Функция принимает JS-обьект с Визардом и возвращает в DOM-элемент (html)
  var renderWizard = function (wizardData) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  // Функция принимает массив JS-обьектов Визардов и отображает на странице
  var displayWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsData.length; i++) {
      var wizardElement = renderWizard(wizardsData[i]); // превращает JS-обьект(элемент) визарда в DOM-элемент
      fragment.appendChild(wizardElement);
    }

    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.querySelectorAll('.setup-similar-item').forEach(function (element) {
      element.remove();
    });
    similarListElement.appendChild(fragment);
  };

  var DEBOUNCE_INTERVAL = 500; // ms
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // Главная программа. createWizardsData() - возвращает массив визардов, сразу передаем его в displayWizards для отображения
  // displayWizards(createWizardsData(4));
  var reloadSimilarWizardsInstant = function () {
    window.backend.load(function (wizards) {
      var nowColorCoat = setupWizardCoat.style.fill;
      var nowColorEyes = setupWizardEye.style.fill || 'black';

      var sameCoatAndEyesWizard = wizards.filter(function (it) {
        return it.colorCoat === nowColorCoat &&
          it.colorEyes === nowColorEyes;
      });

      var sameCoatNoEyes = wizards.filter(function (it) {
        return it.colorCoat === nowColorCoat &&
          it.colorEyes !== nowColorEyes;
      });

      var sameEyesNoCoat = wizards.filter(function (it) {
        return it.colorEyes === nowColorEyes &&
          it.colorCoat !== nowColorCoat;
      });

      var noCoatNoEyes = wizards.filter(function (it) {
        return it.colorCoat !== nowColorCoat &&
          it.colorEyes !== nowColorEyes;
      });

      var result = []
        .concat(sameCoatAndEyesWizard)
        .concat(sameCoatNoEyes)
        .concat(sameEyesNoCoat)
        .concat(noCoatNoEyes)
        .slice(0, 4);

      displayWizards(result);
    });
  };
  reloadSimilarWizardsInstant();
  var reloadSimilarWizards = debounce(reloadSimilarWizardsInstant);

  document.querySelector('.setup-similar').classList.remove('hidden');

  var popup = document.querySelector('.setup');
  var setupWizardCoat = popup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEye = popup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = popup.querySelector('.setup-fireball-wrap');

  // Изменение цвета мантии у Визарда
  setupWizardCoat.addEventListener('click', function () {
    var color = randomElement(coatColors);
    setupWizardCoat.style.fill = color;
    popup.querySelector('input[name="coat-color"]').value = color;
    reloadSimilarWizards();
  });

  // Изменение цвета глаз у Визарда
  setupWizardEye.addEventListener('click', function () {
    var color = randomElement(eyesColors);
    setupWizardEye.style.fill = color;
    popup.querySelector('input[name="eyes-color"]').value = color;
    reloadSimilarWizards();
  });

  // Изменение цвета фаербола у Визарда
  setupWizardFireball.addEventListener('click', function () {
    var color = randomElement(fireballColors);
    setupWizardFireball.style.backgroundColor = color;
    setupWizardFireball.querySelector('input[name="fireball-color"]').value = color;
  });
})();
