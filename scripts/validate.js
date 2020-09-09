// ! ВАЛИДАЦИЯ ФОРМ


// ! ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

// * вынесем отдельным объектом все используемые классы
const allSelectorClasses = {
  form: '.popup__form',
  input: '.popup__input',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled',
  inputTypeError: 'popup__input_type_error',
  errorText: 'popup__input-error_active'
}

// ! ФУНКЦИИ

// * Функция, которая добавляет класс с ошибкой
const showInputError = (formEl, inputEl, errorMessage, allClasses) => {
  // ? получаем спан с текстом ошибки внутри функции
  const errorSpan = formEl.querySelector(`#${inputEl.id}-error`);
  // ? красим форму в красный
  inputEl.classList.add(allClasses.inputTypeError);
  // ? текст спана = параметр errorMessage, в который мы в функции isValid положим свойство validationMessage
  errorSpan.textContent = errorMessage;
  // ? выводим спан с текстом ошибки
  errorSpan.classList.add(allClasses.errorText);
};

// * Функция, которая удаляет класс с ошибкой
const hideInputError = (formEl, inputEl, allClasses) => {
  const errorSpan = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(allClasses.inputTypeError);
  errorSpan.classList.remove(allClasses.errorText);
  // ? чистим текст ошибки
  errorSpan.textContent = '';
};

// * Функция, которая проверяет валидность поля
const isValid = (formEl /* переменная для формы */, inputEl /* переменная для поля ввода */, allClasses) => {
  // ? в if мы передаем уже не конкретный инпут с конкретным классом, а переменную
  if (!inputEl.validity.valid) {
    // ? Если поле не проходит валидацию, покажем ошибку
    // ? showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(formEl, inputEl, inputEl.validationMessage, allClasses);
  } else {
    // ? hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formEl, inputEl, allClasses);
  }
};

// * Функция, которая проверяет, чтобы все поля были валидны

const hasInvalidInput = (inputList) => {
  // ? проходим по этому массиву методом some
  return inputList.some((inputEl) => {
    // ? Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true

    return !inputEl.validity.valid;
  });
};

// * Функция, которая принимает массив полей ввода и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonEl, allClasses) => {
  // ? Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // ? функция сделает кнопку неактивной
    buttonEl.classList.add(allClasses.submitButtonDisabled);
    buttonEl.disabled = true;

  } else {
    // ? в противном случае сделает кнопку активной
    buttonEl.classList.remove(allClasses.submitButtonDisabled);
    buttonEl.disabled = false;
  }
};

// * функция, которая добавляет обработчик всем полям

const setEventListeners = (formEl, allClasses) => {
  // ? Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formEl.querySelectorAll(allClasses.input));

  const buttonEl = formEl.querySelector(allClasses.submitButton);

  // ? Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonEl, allClasses);

  // ? Обходим все элементы полученного массива
  inputList.forEach((inputEl) => {
    // ? на каждый инпут вешаем обработчик события input, то бишь каждого клаца по клавишам
    inputEl.addEventListener('input', () => {
      // ? Внутри колбэка вызываем функцию isValid, передав ей форму и проверяемый элемент
      isValid(formEl, inputEl, allClasses);
      // ? и затем вызываем функцию toggleButtonState, передавая ей массив полей и кнопку
      toggleButtonState(inputList, buttonEl, allClasses);
    });
  });
};

// * функция, которая добавляет обработчик всем формам. она принимает на вход объект. мы его вынесем отдельно, а ей передадим параметром переменную, его обозначающую

const enableValidation = allClasses => {
  // ? Находим все формы с указанным классом в DOM, делаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(allClasses.form));

  // ? Перебираем полученный массив
  formList.forEach(formEl => {
    formEl.addEventListener('submit', (evt) => {
      // ? У каждой формы отменяем стандартное поведение
      evt.preventDefault();
    });

    // ? Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы и объект с классами
    setEventListeners(formEl, allSelectorClasses);
  });
};


// ! ОБРАБОТЧИКИ

// * Вызовем функцию isValid на каждый ввод символа
enableValidation(allSelectorClasses);