import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector('.photo-popup__image');
    this._popupCaption = this._popup.querySelector('.photo-popup__caption');
  }

  open(item) {
    super.open();

    this._item = item;

    this._popupImage.src = this._item.link;
    this._popupImage.alt = this._item.name;
    this._popupCaption.textContent = this._item.name;
  }
}