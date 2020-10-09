export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    console.log('попап открыт');
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    console.log('попап закрыт');
  }

// * интересно, зачем метод close должен быть публичным, если вместо него в index.js вызывается setEventListeners, в который передан в свою очередь close
  
  closePopupOnPopupClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  } this.close();
}

  _handleEscClose() {
    document.addEventListener('keydown', evt => {
      if (this._popup.classList.contains('popup_opened') && evt.key === 'Escape') {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._popup.addEventListener('click', this.closePopupOnPopupClick);
    this._handleEscClose();
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => {
      this.close();
    }); 
  }
}