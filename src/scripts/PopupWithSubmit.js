import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__submit');
    submitButton.addEventListener('click', evt => {
      this.handleSubmit(evt)
      return false
    })
  }
}