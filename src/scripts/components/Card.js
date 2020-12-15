import { renderLoading } from '../utils/utils';
import { popupForDeletingSelector } from '../../pages/index';

export default class Card {
  constructor(data, cardTemplate, handleCardClick, putLike, deleteLike, popupForDeleting, isBinVisible) {
    this._cardTemplate = cardTemplate;
    this.handleCardClick = handleCardClick;
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._visibleCard = this._getTemplate();
    this._likesCounter = this._visibleCard.querySelector('.card__like-scope');
    this.popupForDeleting = popupForDeleting;
    this.id = data._id;
    this.setBinVisibility(isBinVisible);
  };

  // ? лайкнуть карточку
  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
    this.putLike()
      .then(res => res.json())
      .then(data => {
        this._setLikeCount(data.likes.length);
      })
      .catch(err => console.error(`Ошибка при лайке карточки: ${err}`));
  };

  // ? отозвать лайк
  _dislikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
    this.deleteLike()
      .then(res => res.json())
      .then(data => {
        this._setLikeCount(data.likes.length);
      })
      .catch(err => console.error(`Ошибка при отзыве лайка карточки: ${err}`));
  };

// ? обработчик лайка
  _handleLikeClick(evt) {
    if (evt.target.classList.contains('card__like-button_active')) {
      this._dislikeCard(evt);
    } else {
      this._likeCard(evt);
    }

  }

  setBinVisibility(isBinVisible) {
    if (!isBinVisible) {
      this._visibleCard.querySelector('.card__delete-card').classList.add('card__delete-card_invisible');
    }
  }

// ? метод удаления карточки
  _deleteCard() {
    // evt.target.closest('.card').remove();
    if (this.popupForDeleting.querySelector('.popup__submit').textContent === 'Сохранить') {
      this.popupForDeleting.open();
      this.popupForDeleting.setCurrentCardId(this.id);
    } else {
      renderLoading(popupForDeletingSelector);
      this.popupForDeleting.open();
      this.popupForDeleting.setCurrentCardId(this.id);
    }
  };

  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  };

  // TODO надо задать карточке id чтобы можно было ее удалить из разметки по ее id
  // ! создать метод для присвоения ID
  setCardID() {
    this._visibleCard.setAttribute('id', this.id);
  }

  // ? отображаем число лайков
  _setLikeCount(count) {
    this._likesCounter.textContent = count;
  }

  _setEventListeners() {
    this._visibleCard.querySelector('.card__img').addEventListener('click', () => {
      this.handleCardClick();
    });

    this._visibleCard.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);

    this._visibleCard.querySelector('.card__delete-card').addEventListener('click', this._deleteCard);
  };

  getVisibleCard(data) {

    this._setEventListeners();

    this._visibleCard.querySelector('.card__title').textContent = data.name;
    this._visibleCard.querySelector('.card__img').src = data.link;
    this._visibleCard.querySelector('.card__img').alt = data.name;
    this._visibleCard.querySelector('.card__like-scope').textContent = data.likes.length;
    return this._visibleCard;
  };
}
