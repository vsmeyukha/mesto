// ! ИМПОРТИРУЕМ ДАННЫЕ ИЗ МОДУЛЕЙ

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import * as functions from './utils.js';
import * as consts from './consts.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// ! ОБЪЯВЛЯЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

// * вынесем отдельным объектом все используемые классы
const allSelectorClasses = {
  form: '.popup__form',
  input: '.popup__input',
  submitButton: '.popup__submit',
  submitButtonDisabled: 'popup__submit_disabled',
  inputTypeError: 'popup__input_type_error',
  errorText: 'popup__input-error_active'
}

// * блок Profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileRegalia = profile.querySelector('.profile__regalia');
const profileAddButton = profile.querySelector('.profile__add-button');

// * popup Profile-Edit
const popupTypeProfileEdit = document.querySelector('.popup_type_profile-edit'); 
const popupCloseButton = document.querySelector('.popup__close-button'); 
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = document.querySelector('.popup__form_type_user-info');
const popupSubmitButton = document.querySelector('.popup__submit');

// * попап добавления новой карточки
const popupTypeAddNewCard = document.querySelector('.popup_type_add-new-card');
const anotherCloseButton = document.querySelector('.another-close-button'); 
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');

// * секция cards, куда импортятся все карточки
const cardsSection = document.querySelector('.cards');

// * попап с большой фоткой
// const photoPopup = document.querySelector('.photo-popup');

// * темплейт карточки
const templateCard = document.querySelector('#cards-template');


// ! ФУНКЦИИ

// тут надо создавать экземпляр класса попапа с формами и переписывать то, что щас в функции formSubmitHandler, в коллбэк, который передается в параметр экземпляра класса 

// ? итак, создаем экз класса юзер инфо. а перед этим создаем объект с селекторами имени и класса. а также создаем объект с селекторами инпутов попапа.

// ! создаем фотопопап

const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

// ! создаем секшн и прочее для отрисовки карточек 

const initialCardList = new Section({
  items: consts.initialCards,
  renderer: (item) => {
    const handleCardClick = () => {
      photoPopup.open(item);
    };
    const newCard = new Card(item, templateCard, handleCardClick);
    const visibleCard = newCard.getVisibleCard();
    initialCardList.addItem(visibleCard);
  }
}, cardsSection);

// ! создаем все для изменения профиля

const profileSelectors = {
  userNameSelector: '.profile__name',
  userRegaliaSelector: '.profile__regalia'
}

const inputsSelectors = {
  name: '#user-name',
  regalia: '#user-regalia'
}

const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  profileInfo.setUserInfo(inputsSelectors);
  editProfilePopup.close();
}

const profileInfo = new UserInfo(profileSelectors);

const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitProfileEditForm);

profileEditButton.addEventListener('click', () => {
  const {name, regalia} = profileInfo.getUserInfo();
  popupInputTypeName.value = name;
  popupInputTypeRegalia.value = regalia;
  editProfilePopup.open();
});

editProfilePopup.setEventListeners();


// ! создаем все для добавления карточки

const submitAddCardForm = (evt) => {
  evt.preventDefault();

  const item = {
    name: popupFormTypeAddCard.querySelector('.popup__input_type_card-title').value,
    link: popupFormTypeAddCard.querySelector('.popup__input_type_card-link').value
  }

  const handleCardClick = () => {
    photoPopup.open(item);
  };
  
  const newCard = new Card(item, templateCard, handleCardClick);
  const visibleCard = newCard.getVisibleCard();
  
  initialCardList.addItem(visibleCard);
  
  addNewCardPopup.close();

  const submitButton = popupFormTypeAddCard.querySelector('.popup__submit');
  submitButton.classList.add('popup__submit_disabled');
  submitButton.disabled = true;
}

const addNewCardPopup = new PopupWithForm('.popup_type_add-new-card', submitAddCardForm);
profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
});
addNewCardPopup.setEventListeners();



// * объявляем функцию, которая передает введенные в формы значения на обработку
// const formSubmitHandler = evt => {
//   evt.preventDefault();

//   profileName.textContent = popupInputTypeName.value;
//   profileRegalia.textContent = popupInputTypeRegalia.value;

//   functions.togglePopupClass(popupTypeProfileEdit);
// }

// ? РЕНДЕРИНГ КАРТОЧКИ




// functions.closePopupOnEscPress();

// ! ОБРАБОТЧИКИ

// ? протестируем чутка консольные попапы

// const testPopup = new Popup('.popup_type_profile-edit');

// profileEditButton.addEventListener('click', () => {
//   testPopup.open();
// });

// testPopup.setEventListeners();

// ? ОБРАБОТЧИКИ ИЗМЕНЕНИЯ ПРОФИЛЯ И ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// * вешаем обработчики на кнопку edit в блоке profile и кнопку закрытия открытого попапа

// profileEditButton.addEventListener('click', () => {
//   if (popupTypeProfileEdit.classList.contains('popup_opened') === false) {
//     popupInputTypeName.value = profileName.textContent;
//     popupInputTypeRegalia.value = profileRegalia.textContent;

//     popupSubmitButton.classList.remove('popup__submit_disabled');
//     popupSubmitButton.disabled = false;
//   }

//   functions.togglePopupClass(popupTypeProfileEdit);
// });
// popupCloseButton.addEventListener('click', () => functions.togglePopupClass(popupTypeProfileEdit));

// * вешаем обработчик событий на фон попапа редактирования профиля. по клику на фон попап закрывается.
// popupTypeProfileEdit.addEventListener('click', functions.closePopupOnClick);

// * вешаем обработчик на форму попапа редактирования профиля - попап по клику на кнопку "сохранить" закрывается
// popupFormTypeUserInfo.addEventListener('submit', formSubmitHandler);

// ? ОБРАБОТЧИКИ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ

// * вешаем обработчик на кнопку с плюсиком в блоке profile. по клику на кнопку открывается попап добавления карточки
// profileAddButton.addEventListener('click', () => functions.togglePopupClass(popupTypeAddNewCard));
// * вешаем обработчик на крестик в попапе добавления карточки
// anotherCloseButton.addEventListener('click', () => functions.togglePopupClass(popupTypeAddNewCard));
// * вешаем обработчик на попап добавления карточки - по клику на фон попап закрывается
// popupTypeAddNewCard.addEventListener('click', functions.closePopupOnClick);

// * вешаем обработчик на форму попапа добавления карточки. по клику на кнопку "сохранить" добавляется новая карточка
// popupFormTypeAddCard.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const submitButton = popupFormTypeAddCard.querySelector('.popup__submit');

//   const item = {
//     name: popupFormTypeAddCard.querySelector('.popup__input_type_card-title').value,
//     link: popupFormTypeAddCard.querySelector('.popup__input_type_card-link').value
// }
  
//   const newCard = new Card(item, templateCard, photoPopup);
//   const visibleCard = newCard.getVisibleCard();

//   initialCardList.addItem(visibleCard);

//   functions.togglePopupClass(popupTypeAddNewCard);

//   popupFormTypeAddCard.reset();
  
//   submitButton.classList.add('popup__submit_disabled');
//   submitButton.disabled = true;
// });

// * вешаем обработчик на кнопку закрытия большого попапа
// photoPopup.querySelector('.photo-popup__close-button').addEventListener('click', () => functions.togglePopupClass(photoPopup));

// * вешаем обработчик на фон попапа с большим фото. по клику на фон попап закрывается
// photoPopup.addEventListener('click', functions.closePopupOnClick);

// * МАССИВ

initialCardList.renderAll();

const validUserInfo = new FormValidator(allSelectorClasses, popupFormTypeUserInfo);
const validAddCard = new FormValidator(allSelectorClasses, popupFormTypeAddCard);

validUserInfo.enableValidation();
validAddCard.enableValidation();