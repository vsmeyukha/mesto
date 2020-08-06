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

let popupReaction = function (event) {
  console.log(event);
  popup.classList.toggle('popup_opened');
}

// popupReaction();

profileEditButton.addEventListener('click', popupReaction, true);

popupCloseButton.addEventListener('click', popupReaction, true);

let page = document.querySelector('.page');

page.addEventListener('click', (evt) => console.log('gogol'), true);