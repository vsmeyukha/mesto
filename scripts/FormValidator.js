export default class FormValidator {
  constructor(allClasses, popupForm) {
    this._allClasses = allClasses;
    this._popupForm = popupForm;
  }

  // * Функция, которая добавляет класс с ошибкой
  _showInputError = (inputEl, errorMessage) => {
    // ? получаем спан с текстом ошибки внутри функции
    const _errorSpan = this._popupForm.querySelector(`#${inputEl.id}-error`);
    // ? красим форму в красный
    inputEl.classList.add(this._allClasses.inputTypeError);
    // ? текст спана = параметр errorMessage, в который мы в функции isValid положим свойство validationMessage
    _errorSpan.textContent = errorMessage;
    // ? выводим спан с текстом ошибки
    _errorSpan.classList.add(this._allClasses.errorText);
  };

  // * Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputEl) => {
    const _errorSpan = this._popupForm.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._allClasses.inputTypeError);
    _errorSpan.classList.remove(this._allClasses.errorText);
    // ? чистим текст ошибки
    _errorSpan.textContent = '';
  };

  // * Функция, которая проверяет валидность поля
  _isValid = (inputEl) => {
    // ? в if мы передаем уже не конкретный инпут с конкретным классом, а переменную
    if (!inputEl.validity.valid) {
      // ? Если поле не проходит валидацию, покажем ошибку
      // ? showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      // ? hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(inputEl);
    }
  };

  // * Функция, которая проверяет, чтобы все поля были валидны
  _hasInvalidInput = (_inputList) => {
    // ? проходим по этому массиву методом some
    return _inputList.some((inputEl) => {
      // ? Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true

      return !inputEl.validity.valid;
    });
  };

  // * Функция, которая принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (_inputList, _buttonEl) => {
    // ? Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(_inputList)) {
      // ? функция сделает кнопку неактивной
      _buttonEl.classList.add(this._allClasses.submitButtonDisabled);
      _buttonEl.disabled = true;

    } else {
      // ? в противном случае сделает кнопку активной
      _buttonEl.classList.remove(this._allClasses.submitButtonDisabled);
      _buttonEl.disabled = false;
    }
};

  // * функция, которая добавляет обработчик всем полям
  _setEventListeners = () => {
    // ? Находим все поля внутри формы, сделаем из них массив методом Array.from
    const _inputList = Array.from(this._popupForm.querySelectorAll(this._allClasses.input));
  
    const _buttonEl = this._popupForm.querySelector(this._allClasses.submitButton);
  
    // ? Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(_inputList, _buttonEl);
  
    // ? Обходим все элементы полученного массива
    _inputList.forEach((inputEl) => {
      // ? на каждый инпут вешаем обработчик события input, то бишь каждого клаца по клавишам
      inputEl.addEventListener('input', () => {
        // ? Внутри колбэка вызываем функцию isValid, передав ей форму и проверяемый элемент
        this._isValid(inputEl);
        // ? и затем вызываем функцию toggleButtonState, передавая ей массив полей и кнопку
        this._toggleButtonState(_inputList, _buttonEl);
      });
    });
  };

  // * функция, которая добавляет обработчик всем формам. она принимает на вход объект. мы его вынесем отдельно, а ей передадим параметром переменную, его обозначающую
  enableValidation = () => {    
    this._popupForm.addEventListener('submit', (evt) => {
        // ? У каждой формы отменяем стандартное поведение
        evt.preventDefault();
      });
      // ? Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы и объект с классами
      this._setEventListeners();
    };
  };