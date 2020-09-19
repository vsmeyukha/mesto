import * as data from './utils.js';

export default class Card {
  // static _cardTemplate = document.querySelector('#cards-template').content;

  constructor(data, cardTemplate, photoPopup) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._photoPopup = photoPopup;
    
  };

  _likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  }; // ? здесь в оригинале было решение через evt.target. как верно? 

  _deleteCard = (evt) => {
    evt.target.closest('.card').remove();
  };

  _getTemplate = () => {
    this._visibleCard = this._cardTemplate.content.cloneNode(true);
  };

  _setEventListeners = () => {
    this._visibleCard.querySelector('.card__img').addEventListener('click', () => {
      this._photoPopup.querySelector('.photo-popup__image').src = this._data.link;
      this._photoPopup.querySelector('.photo-popup__image').alt = this._data.name;
      this._photoPopup.querySelector('.photo-popup__caption').textContent = this._data.name;
  
      data.togglePopupClass(this._photoPopup);
    });
    this._visibleCard.querySelector('.card__like-button').addEventListener('click', this._likeCard);
    this._visibleCard.querySelector('.card__delete-card').addEventListener('click', this._deleteCard);
  };

  getVisibleCard = () => {
    this._getTemplate();
    this._setEventListeners();
    this._visibleCard.querySelector('.card__title').textContent = this._data.name;
    this._visibleCard.querySelector('.card__img').src = this._data.link;
    return this._visibleCard;
  };
}