'use strict';
// Задание 7
// 1. Открытие и закрытие модалки .setup


(function () {
  var popup = document.querySelector('.setup');
  var openPopupButton = document.querySelector('.setup-open');
  var closePopupButton = popup.querySelector('.setup-close');
  var userNameInput = popup.querySelector('.setup-user-name');
  var savePopupButton = popup.querySelector('.setup-submit');
  var popupWizardForm = popup.querySelector('.setup-wizard-form');

  var popupOpenClickHandler = function () {
    popup.classList.remove('hidden');
  };

  var popupCloseClickHandler = function () {
    popup.classList.add('hidden');
  };

  openPopupButton.addEventListener('click', popupOpenClickHandler);
  closePopupButton.addEventListener('click', popupCloseClickHandler);

  openPopupButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, popupOpenClickHandler);
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      if (userNameInput !== document.activeElement) {
        popupCloseClickHandler();
      }
    });
  });

  // Закрытие модалки через Enter если наведено по Tab
  closePopupButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, popupCloseClickHandler);
  });

  // Фокус на кнопке -сохранить- Enter-отправляет форму
  savePopupButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      popupWizardForm.submit();
    });
  });

  popupWizardForm.addEventListener('submit', function (evt) {
    window.backend.save(
        new FormData(popupWizardForm),
        popupCloseClickHandler,
        function (error) {
          var errorBlock = document.querySelector('#error-template').content.querySelector('.error');
          var errorCopy = errorBlock.cloneNode(true);

          errorCopy.querySelector('.error-text').textContent = error;
          document.querySelector('body').appendChild(errorCopy);
        });
    evt.preventDefault();
  });
})();


(function () {
  var popupDialogElement = document.querySelector('.setup');
  var popupHandler = popupDialogElement.querySelector('.upload');

  popupHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      popupDialogElement.style.top = (popupDialogElement.offsetTop - shift.y) + 'px';
      popupDialogElement.style.left = (popupDialogElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          popupHandler.removeEventListener('click', onClickPreventDefault);
        };
        popupHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

