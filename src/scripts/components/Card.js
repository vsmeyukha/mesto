export default class Card {
  constructor(data, cardTemplate, handleCardClick, putLike, deleteLike, popupForDeleting, isBinVisible) {
    this._cardTemplate = cardTemplate;
    this.handleCardClick = handleCardClick;
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._visibleCard = this._getTemplate();
    this.popupForDeleting = popupForDeleting;
    this.id = data._id;
    this.setBinVisibility(isBinVisible);
    this.deleteButton = null;
  };

  // ? лайкнуть карточку
  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
    this.putLike()
  };

  // ? отозвать лайк
  _dislikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
    this.deleteLike();
  };

// ? обработчик лайка
  _handleLikeClick(evt) {
    if (evt.target.classList.contains('card__like-button_active')) {
      this._dislikeCard(evt);
    } else {
      this._likeCard(evt);
    }
  }



// ? метод удаления карточки
  _deleteCard() {
    console.log(this.popupForDeleting, this);
    // evt.target.closest('.card').remove();
      this.popupForDeleting.open();
      this.popupForDeleting.setCurrentCardId(this.id);
  };

  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  };

  setBinVisibility(isBinVisible) {
    if (!isBinVisible) {
      this.deleteButton = this._visibleCard.querySelector('.card__delete-card');
      this.deleteButton.classList.add('card__delete-card_invisible');
    }
  }

  // TODO надо задать карточке id чтобы можно было ее удалить из разметки по ее id
  // ! создать метод для присвоения ID
  setCardID() {
    this._visibleCard.setAttribute('id', this.id);
  }

  _setEventListeners() {
    this.deleteButton = this._visibleCard.querySelector('.card__delete-card');

    this._visibleCard.querySelector('.card__img').addEventListener('click', () => {
      this.handleCardClick();
    });

    this._visibleCard.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);

    this.deleteButton.addEventListener('click', this._deleteCard);
  };

  getVisibleCard(data) {

    this._setEventListeners();

    const image = this._visibleCard.querySelector('.card__img');

    this._visibleCard.querySelector('.card__title').textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
    this._visibleCard.querySelector('.card__like-scope').textContent = data.likes.length;
    this._visibleCard.querySelector('div').setAttribute('id', data._id);
    return this._visibleCard;
  };
}
