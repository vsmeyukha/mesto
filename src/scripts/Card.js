// import { popupForDeleting } from '../index';

import PopupWithSubmit from "./PopupWithSubmit";

export default class Card {
  constructor(data, cardTemplate, handleCardClick, handleLikeClick, popupForDeleting) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this._likeCard = this._likeCard.bind(this)
    this._deleteCard = this._deleteCard.bind(this)
    this._visibleCard = this._getTemplate();
    this._likesCounter = this._visibleCard.querySelector('.card__like-scope');
    // ! инициализируем попап для удаления
    this.popupForDeleting = popupForDeleting
  };

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
    this.handleLikeClick()
        .then(res => res.json())
        .then(data => {
          this._setLikeCount(data.likes.length);
        })
  };

  _deleteCard() {
    // evt.target.closest('.card').remove();
    this.popupForDeleting.open();
  };

  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  };

  /**
   * Отображение лайков
   * @param count
   * @private
   */
  _setLikeCount(count) {
    this._likesCounter.textContent = count;
  }

  /**
   * Обработчики кликов
   * @param _visibleCard
   * @private
   */
  _setEventListeners(_visibleCard) {
    _visibleCard.querySelector('.card__img').addEventListener('click', () => {
      this.handleCardClick();
    });

    _visibleCard.querySelector('.card__like-button').addEventListener('click', this._likeCard);

    _visibleCard.querySelector('.card__delete-card').addEventListener('click', this._deleteCard);
  };

  /**
   * Отображаем данные
   * @param data
   * @returns {*}
   */
  getVisibleCard(data) {
    /**
     * Навешиваем обработчики
     */
    this._setEventListeners(this._visibleCard);
    /**
     * Исходные значения
     */
    this._visibleCard.querySelector('.card__title').textContent = data.name;
    this._visibleCard.querySelector('.card__img').src = data.link;
    this._visibleCard.querySelector('.card__like-scope').textContent = data.likes.length;
    return this._visibleCard;
  };
}
