// ! ИМПОРТИРУЕМ ДАННЫЕ ИЗ МОДУЛЕЙ

import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import * as consts from './scripts/consts.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import './pages/index.css';
import Api from './scripts/utils/Api';

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
const profileAddButton = profile.querySelector('.profile__add-button');

// * popup Profile-Edit
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = document.querySelector('.popup__form_type_user-info');

// * попап добавления новой карточки
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');
const submitButton = popupFormTypeAddCard.querySelector('.popup__submit');

// * секция cards, куда импортятся все карточки
const cardsSection = document.querySelector('.cards');

// * темплейт карточки
const templateCard = document.querySelector('#cards-template');

// ! API

const api = new Api('2dbd0122-ea43-4557-862d-f5c5a66a918e');

// ! создаем фотопопап

const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

// ! создаем секшн и прочее для отрисовки карточек 

const getNewCard = (item, templateCard, handleCardClick) => {
  const newCard = new Card(item, templateCard, handleCardClick);
  return newCard.getVisibleCard();
}

// ! создаем все для изменения профиля

const profileSelectors = {
  userNameSelector: '.profile__name',
  userRegaliaSelector: '.profile__regalia'
}

const submitProfileEditForm = (evt, values) => {
  evt.preventDefault();
  profileInfo.setUserInfo(...values);
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

api.getUserInfo()
  .then((res) => {
  return res.json();
  })
  .then((data) => {
    console.log(data);
    profileInfo.setUserInfo(data.name, data.about);
  })

// ! создаем все для добавления карточки

const submitAddCardForm = (evt, [name, link]) => {
  evt.preventDefault();

  const item = {
    name, link
  }

  const handleCardClick = () => {
    photoPopup.open(item);
  };
  
  // const newCard = createCard(item, templateCard, handleCardClick);;
  // const visibleCard = newCard.getVisibleCard();
  
  initialCardList.addItem(getNewCard(item, templateCard, handleCardClick));

  addNewCardPopup.close();

  submitButton.classList.add('popup__submit_disabled');
  submitButton.disabled = true;
}

const addNewCardPopup = new PopupWithForm('.popup_type_add-new-card', submitAddCardForm);
profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
});
addNewCardPopup.setEventListeners();

// * МАССИВ

api.getInitialCards()
  .then(res => res.json())
  .then((items) => {
    const initialCardList = new Section({
      items,
      renderer: (item) => {
        const handleCardClick = () => {
          photoPopup.open(item);
        };
        initialCardList.addItem(getNewCard(item, templateCard, handleCardClick));
      }
    }, cardsSection);
    initialCardList.renderAll();
  })

const validUserInfo = new FormValidator(allSelectorClasses, popupFormTypeUserInfo);
const validAddCard = new FormValidator(allSelectorClasses, popupFormTypeAddCard);

validUserInfo.enableValidation();
validAddCard.enableValidation();