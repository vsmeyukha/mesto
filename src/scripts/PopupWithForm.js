import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._popupInputs = [];
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    return this._popupInputs.map(input => {
      return input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      const values = this._getInputValues();
      console.log('test');
      this.submitForm(evt, values);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}