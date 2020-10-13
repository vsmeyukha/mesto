import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  open(item) {
    super.open();

    this._item = item;

    this._popup.querySelector('.photo-popup__image').src = this._item.link;
    this._popup.querySelector('.photo-popup__image').alt = this._item.name;
    this._popup.querySelector('.photo-popup__caption').textContent = this._item.name;
  }
}