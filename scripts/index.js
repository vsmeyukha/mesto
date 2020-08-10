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

let changePopupClass = function () {
  popup.classList.toggle('popup_opened');
}

let popupClose = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    changePopupClass(event);
  }
}

profileEditButton.addEventListener('click', changePopupClass);
popupCloseButton.addEventListener('click', changePopupClass);
popup.addEventListener('click', popupClose)

let page = document.querySelector('.page');

// page.addEventListener('click', (evt) => console.log('gogol'), true);

// ! ОТОБРАЖЕНИЕ ИНФЫ СО СТРАНИЦЫ В ПЛЕЙСХОЛДЕРАХ ФОРМ ПОПАПА

let profileName = document.querySelector('.profile__name');
let profileRegalia = document.querySelector('.profile__regalia');

let popupInputName = document.querySelector('.popup__input-name');
let popupInputRegalia = document.querySelector('.popup__input-regalia');

popupInputName.placeholder = profileName.textContent;
popupInputRegalia.placeholder = profileRegalia.textContent;

console.log(popupInputName.value);



// ! ЗНАЧЕНИЯ, ВВЕДЕННЫЕ В ФОРМЫ, ПЕРЕДАЮТСЯ В БЛОК PROFILE

let popupForm = popup.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  let popupInputName = document.querySelector('.popup__input-name');
  let popupInputRegalia = document.querySelector('.popup__input-regalia');
  
  let profileName = document.querySelector('.profile__name');
  let profileRegalia = document.querySelector('.profile__regalia');

  let popupInputNameValue = popupInputName.value;
  let popupInputRegaliaValue = popupInputRegalia.value;

  profileName.textContent = popupInputNameValue;
  profileRegalia.textContent = popupInputRegaliaValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
popupForm.addEventListener('submit', changePopupClass);
