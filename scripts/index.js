// ! ИМПОРТИРУЕМ ДАННЫЕ ИЗ МОДУЛЕЙ

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import * as data from './utils.js';
import * as consts from './consts.js'

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
const photoPopup = document.querySelector('.photo-popup');

// * темплейт карточки
const templateCard = document.querySelector('#cards-template');


// ! ФУНКЦИИ

// * объявляем функцию, которая передает введенные в формы значения на обработку
const formSubmitHandler = evt => {
  evt.preventDefault();

  profileName.textContent = popupInputTypeName.value;
  profileRegalia.textContent = popupInputTypeRegalia.value;

  data.togglePopupClass(popupTypeProfileEdit);
}

// ? РЕНДЕРИНГ КАРТОЧКИ

const renderCard = (newCard) => {
  cardsSection.prepend(newCard);
}

data.closePopupOnEscPress();


// ! ОБРАБОТЧИКИ

// ? ОБРАБОТЧИКИ ИЗМЕНЕНИЯ ПРОФИЛЯ И ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// * вешаем обработчики на кнопку edit в блоке profile и кнопку закрытия открытого попапа

profileEditButton.addEventListener('click', () => {
  if (popupTypeProfileEdit.classList.contains('popup_opened') === false) {
    popupInputTypeName.value = profileName.textContent;
    popupInputTypeRegalia.value = profileRegalia.textContent;

    popupSubmitButton.classList.remove('popup__submit_disabled');
    popupSubmitButton.disabled = false;
  }

  data.togglePopupClass(popupTypeProfileEdit);
});
popupCloseButton.addEventListener('click', () => data.togglePopupClass(popupTypeProfileEdit));

// * вешаем обработчик событий на фон попапа редактирования профиля. по клику на фон попап закрывается.
popupTypeProfileEdit.addEventListener('click', data.closePopupOnClick);

// * вешаем обработчик на форму попапа редактирования профиля - попап по клику на кнопку "сохранить" закрывается
popupFormTypeUserInfo.addEventListener('submit', formSubmitHandler);

// ? ОБРАБОТЧИКИ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ

// * вешаем обработчик на кнопку с плюсиком в блоке profile. по клику на кнопку открывается попап добавления карточки
profileAddButton.addEventListener('click', () => data.togglePopupClass(popupTypeAddNewCard));
// * вешаем обработчик на крестик в попапе добавления карточки
anotherCloseButton.addEventListener('click', () => data.togglePopupClass(popupTypeAddNewCard));
// * вешаем обработчик на попап добавления карточки - по клику на фон попап закрывается
popupTypeAddNewCard.addEventListener('click', data.closePopupOnClick);

// * вешаем обработчик на форму попапа добавления карточки. по клику на кнопку "сохранить" добавляется новая карточка
popupFormTypeAddCard.addEventListener('submit', evt => {
  evt.preventDefault();

  const submitButton = popupFormTypeAddCard.querySelector('.popup__submit');

  const cardImg = popupFormTypeAddCard.querySelector('.popup__input_type_card-link').value;
  const cardTitle = popupFormTypeAddCard.querySelector('.popup__input_type_card-title').value;

  const newCard = new Card(cardTitle, cardImg, templateCard, photoPopup);

  renderCard(newCard.render());

  data.togglePopupClass(popupTypeAddNewCard);

  popupFormTypeAddCard.reset();
  
  submitButton.classList.add('popup__submit_disabled');
  submitButton.disabled = true;
  // ! осталось добавить сюда тогглбаттонстейт, чтобы кнопарь тоже работал
});

// * вешаем обработчик на кнопку закрытия большого попапа
photoPopup.querySelector('.photo-popup__close-button').addEventListener('click', () => data.togglePopupClass(photoPopup));

// * вешаем обработчик на фон попапа с большим фото. по клику на фон попап закрывается
photoPopup.addEventListener('click', data.closePopupOnClick);

consts.initialCards.forEach(card => {
  const newCard = new Card(card.name, card.link, templateCard, photoPopup);
  renderCard(newCard.render());
});



const validUserInfo = new FormValidator(allSelectorClasses, popupFormTypeUserInfo);
const validAddCard = new FormValidator(allSelectorClasses, popupFormTypeAddCard);

validUserInfo.enableValidation();
validAddCard.enableValidation();