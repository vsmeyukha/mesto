import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._popupInputs = [];
  }

  _getInputValues() {
    this._popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    return this._popupInputs.map(input => {
      return input.value;
    });
  } // ? вот эта фигня под большим вопросом

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', (evt) => {
      this.submitForm(evt);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}



// ! Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
  // ? done
// ! Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  // ? done
// ! Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// ! Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  // ? done
// ! Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// ? done
// ! Для каждого попапа создавайте свой экземпляр класса PopupWithForm.