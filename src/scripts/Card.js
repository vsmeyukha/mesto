import { popupForDeleting } from '../index';

export default class Card {
  constructor(data, cardTemplate, handleCardClick, handleLike) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this.handleCardClick = handleCardClick;
    this.handleLike = handleLike;
    this._visibleCard = this._cardTemplate.content.cloneNode(true);
  };

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  };

  _deleteCard(evt) {
    // evt.target.closest('.card').remove();
    popupForDeleting.open();
  };

  _getTemplate() {
    
  };

  _setLikeCount(count) {
    debugger;
    this._visibleCard.querySelector('.card__like-scope').textContent = count;
  }

  _setEventListeners() {
    this._visibleCard.querySelector('.card__img').addEventListener('click', () => {
      this.handleCardClick();
    });

    this._visibleCard.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._likeCard(evt);
      // debugger;
      this.handleLike(this._data._id)
        .then(res => res.json())
        .then(data => {
          this._setLikeCount(data.likes.length);
        });
    });
    
    this._visibleCard.querySelector('.card__delete-card').addEventListener('click', this._deleteCard);
  };

  getVisibleCard() {
    this._getTemplate();
    this._setEventListeners();
    this._visibleCard.querySelector('.card__title').textContent = this._data.name;
    this._visibleCard.querySelector('.card__img').src = this._data.link;
    this._visibleCard.querySelector('.card__like-scope').textContent = this._data.likes.length;
    return this._visibleCard;
  };
}