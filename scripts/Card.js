export default class Card {
  // static _cardTemplate = document.querySelector('#cards-template').content;

  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  } // ? здесь в оригинале было решение через evt.target. как верно? 

  _deleteCard = (evt) => {
    evt.target.closest('.card').remove();
  }

  render = () => {
    
    this._visibleCard = this._cardTemplate.content.cloneNode(true); // ? да почему чилдрен-то???
    this._visibleCard.querySelector('.card__title').textContent = this._name;
    this._visibleCard.querySelector('.card__img').src = this._link;

    this._visibleCard.querySelector('.card__img').addEventListener('click', () => {
      const photoPopup = document.querySelector('.photo-popup');
      photoPopup.querySelector('.photo-popup__image').src = this._link;
      photoPopup.querySelector('.photo-popup__caption').textContent = this._name;
  
      togglePopupClass(photoPopup);
    })
    this._visibleCard.querySelector('.card__like-button').addEventListener('click', this._likeCard);
    this._visibleCard.querySelector('.card__delete-card').addEventListener('click', this._deleteCard);

    return this._visibleCard;
  }
}