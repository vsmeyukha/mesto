import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.currentCardId = null;
  }

  open() {
    super.open();
    this._popup.querySelector('.popup__submit').textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__submit');
    submitButton.addEventListener('click', () => {
      this._popup.querySelector('.popup__submit').textContent = 'Подожди чутка';
      this.handleSubmit(this.currentCardId);
    });
  }

// ? задаем попапу id текущей карточки
  setCurrentCardId (id) {
    this.currentCardId = id;
  }
}
