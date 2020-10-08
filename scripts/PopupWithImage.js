import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    super.open();

    this._item = item;

    this._popup.querySelector('.photo-popup__image').src = this._item.link;
    this._popup.querySelector('.photo-popup__caption').textContent = this._item.name;
  }
}