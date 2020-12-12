import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.currentCardId = null;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__submit');
    submitButton.addEventListener('click', () => this.handleSubmit(this.currentCardId));
  }

// ? задаем попапу id текущей карточки
  setCurrentCardId (id) {
    this.currentCardId = id;
  }
}
