// ! ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА

// * кнопка открытия попапа
let profileEditButton = document.querySelector('.profile__edit-button');
// console.log(profileEditButton);

// * фон
let popup = document.querySelector('.popup');
// console.log(popup);

// * кнопка закрытия попапа
let popupCloseButton = document.querySelector('.popup__close-button');
// console.log(popupCloseButton);

// * сам попап
let popupContainer = document.querySelector('.popup__container');
// console.log(popupContainer);

let popupReaction = function () {
  popup.classList.toggle('popup_opened');
}

let popupClose = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    popupReaction(event);
  }
}

profileEditButton.addEventListener('click', popupReaction);
popupCloseButton.addEventListener('click', popupReaction);
popup.addEventListener('click', popupClose)

let page = document.querySelector('.page');

// page.addEventListener('click', (evt) => console.log('gogol'), true);

// ! ОТОБРАЖЕНИЕ ИНФЫ СО СТРАНИЦЫ В ПЛЕЙСХОЛДЕРАХ ФОРМ ПОПАПА
