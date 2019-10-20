'use strict';

// Функция которая возвращает рандомный элемент из массива(пригодится)
(function () {
  var randomElement = function (array) {
    var randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber];
  };

  // Массивы
  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Функция которая возвращает рандомного Визарда
  var randomWizard = function () {
    return {
      name: randomElement(wizardNames) + ' ' + randomElement(wizardSurnames),
      coatColor: randomElement(coatColors),
      eyesColor: randomElement(eyesColors)
    };
  };

  // Функция создает массив Визардов
  var createWizardsData = function (wizardsCount) {
    var result = [];

    for (var i = 0; i < wizardsCount; i++) {
      result.push(randomWizard());
    }

    return result;
  };

  // Функция принимает JS-обьект с Визардом и возвращает в DOM-элемент (html)
  var renderWizard = function (wizardData) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

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
    similarListElement.appendChild(fragment);
  };

  // Главная программа. createWizardsData() - возвращает массив визардов, сразу передаем его в displayWizards для отображения
  displayWizards(createWizardsData(4));

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
  });

  // Изменение цвета глаз у Визарда
  setupWizardEye.addEventListener('click', function () {
    var color = randomElement(eyesColors);
    setupWizardEye.style.fill = color;
    popup.querySelector('input[name="eyes-color"]').value = color;
  });

  // Изменение цвета фаербола у Визарда
  setupWizardFireball.addEventListener('click', function () {
    var color = randomElement(fireballColors);
    setupWizardFireball.style.backgroundColor = color;
    setupWizardFireball.querySelector('input[name="fireball-color"]').value = color;
  });
})();
