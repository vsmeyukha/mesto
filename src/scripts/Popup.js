export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBind);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBind);
  }

// * интересно, зачем метод close должен быть публичным, если вместо него в index.js вызывается setEventListeners, в который передан в свою очередь close
  
  _closePopupOnPopupClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  } this.close();
}

  _handleEscClose(evt) {
      if (this._popup.classList.contains('popup_opened') && evt.key === 'Escape') {
        this.close();
      }
    };

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupOnPopupClick.bind(this));
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => {
      this.close();
    }); 
  }
}