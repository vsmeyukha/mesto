export default class FormValidator {
  // ? валидатор принимает в конструктор объект с селекторами всех элементов, так или иначе задействованных при валидации, и элемент формы, которую надо валидировать
  constructor(validationConfig, popupForm) {
    this._validationConfig = validationConfig;
    this._popupForm = popupForm;
  }

  // * Функция, которая добавляет класс с ошибкой
  _showInputError(inputEl, errorMessage) {
    // ? получаем спан с текстом ошибки внутри функции
    const _errorSpan = this._popupForm.querySelector(`#${inputEl.id}-error`);
    // ? красим форму в красный
    inputEl.classList.add(this._validationConfig.inputTypeError);
    // ? текст спана = параметр errorMessage, в который мы в функции isValid положим свойство validationMessage
    _errorSpan.textContent = errorMessage;
    // ? выводим спан с текстом ошибки
    _errorSpan.classList.add(this._validationConfig.errorText);
  };

  // * Функция, которая удаляет класс с ошибкой
  _hideInputError(inputEl) {
    // ?  получаем спан с текстом ошибки внутри функции
    const _errorSpan = this._popupForm.querySelector(`#${inputEl.id}-error`);
    // ? убираем красный цвет инпута
    inputEl.classList.remove(this._validationConfig.inputTypeError);
    // ? убираем еррорСпан
    _errorSpan.classList.remove(this._validationConfig.errorText);
    // ? чистим текст ошибки
    _errorSpan.textContent = '';
  };

  // * Функция, которая проверяет валидность поля
  isValid(inputEl) {
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
  _hasInvalidInput() {
    // ? проходим по этому массиву методом some
    return this._inputList.some((inputEl) => {
      // ? Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true

      return !inputEl.validity.valid;
    });
  };

  // * Функция, которая принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState() {
    // ? Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // ? функция сделает кнопку неактивной
      this._buttonEl.classList.add(this._validationConfig.submitButtonDisabled);
      this._buttonEl.disabled = true;

    } else {
      // ? в противном случае сделает кнопку активной
      this._buttonEl.classList.remove(this._validationConfig.submitButtonDisabled);
      this._buttonEl.disabled = false;
    }
};

  // * функция, которая добавляет обработчик всем полям
  _setEventListeners() {
    // ? Находим все поля внутри формы, сделаем из них массив методом Array.from
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._validationConfig.input));
  
    this._buttonEl = this._popupForm.querySelector(this._validationConfig.submitButton);
  
    // ? Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState();
  
    // ? Обходим все элементы полученного массива
    this._inputList.forEach((inputEl) => {
      // ? на каждый инпут вешаем обработчик события input, то бишь каждого клаца по клавишам
      inputEl.addEventListener('input', () => {
        // ? Внутри колбэка вызываем функцию isValid, передав ей форму и проверяемый элемент
        this.isValid(inputEl);
        // ? и затем вызываем функцию toggleButtonState, передавая ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  };

  resetForm() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._validationConfig.input));

    this._inputList.forEach(inputEl => {
      this._hideInputError(inputEl);
    })
  }

  // * функция, которая добавляет обработчик всем формам. она принимает на вход объект. мы его вынесем отдельно, а ей передадим параметром переменную, его обозначающую
  enableValidation() {    
    this._popupForm.addEventListener('submit', (evt) => {
        // ? У каждой формы отменяем стандартное поведение
        evt.preventDefault();
      });
      // ? Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы и объект с классами
      this._setEventListeners();
    };
  };