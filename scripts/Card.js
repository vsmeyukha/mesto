export default class Card {
  static _cardTemplate = document.querySelector('#cards-template').content;

  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  render = () => {
    this._visibleCard = Card._cardTemplate.cloneNode(true).children[0];
    this._visibleCard.querySelector('.card__title').textContent = this._name;
    this._visibleCard.querySelector('.card__img') = this._link;
  }

}

