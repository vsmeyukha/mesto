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

// По заданию класс Card должен содержать приватные методы: метод который работает с разметкой, и метод который устанавливает слушатели событий, а также один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки. Сейчас все эти функции записаны в один публичный метод render.
// Следуя принципу единственной ответственности для нас важно, чтобы методы выполняли только одну задачу, поэтому необходимо разделить данный код метода render на несколько обособленных, согласно заданию: 
// 1. возвращение разметки карточки
// 2. установка слушателей
// 3. возвращение полностью работоспособного и наполненного данными элемента карточки
// Например:
// _getTemplate() {
// клонирует содержимое тега template и возвращает этот элемент разметки оператором return
// }
// _setEventListeners() {
// устанавливает обработчики: 
// ...addEventListener('click', ...);
// ...addEventListener('click', ...);
// ...addEventListener('click', ...);
// };
// getVisibleCard() {
// публичный метод, возвращающий представление карточки (внутри него происходит вызов двух предыдущих методов и наполнение карточки содержимым)
// };