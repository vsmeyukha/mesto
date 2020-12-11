import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__submit');
    submitButton.addEventListener('submit', (evt, id) => {
      this.handleSubmit(evt, id);
    })
  }
}