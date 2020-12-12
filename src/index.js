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
import PopupWithSubmit from "./scripts/PopupWithSubmit";

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

const getNewCard = (item, templateCard, handleCardClick, likeACard) => {
  // ! создаем попап для удаления и передаем его далее в качестве аргумента в new Card()
  const deleteACard = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    console.log('hello');
    api.deleteCard(item._id)
      .then(res => res.json())
      .then((data) => {
        const id = data._id;
        console.log('removed card with id', id);
      });
  }
  // ! ПОПАП ПОДТВЕРЖДЕНИЯ
  const popupForDeleting = new PopupWithSubmit('.popup_type_submit', deleteACard);
  popupForDeleting.setEventListeners();
    
  const newCard = new Card(item, templateCard, handleCardClick, likeACard, popupForDeleting);
  return newCard.getVisibleCard(item);
}

const initialCardList = new Section({
  items: [],
  renderer: (item) => {
    const likeACard = () => api.addALike(item._id);
    const handleCardClick = () => {
      photoPopup.open(item);
    };
    initialCardList.addItem(getNewCard(item, templateCard, handleCardClick, likeACard));
  }
}, cardsSection);

// ! создаем все для изменения профиля

const profileSelectors = {
  userNameSelector: '.profile__name',
  userRegaliaSelector: '.profile__regalia'
}

const submitProfileEditForm = (evt, values) => {
  evt.preventDefault();
  const [name, about] = values;
  api.editProfile({name, about})
    .then(res => res.json())
    .then(data => {
      profileInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
}

const profileInfo = new UserInfo(profileSelectors);

const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', submitProfileEditForm);

profileEditButton.addEventListener('click', () => {
  const { name, regalia } = profileInfo.getUserInfo();
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

  api.addNewCard({ name, link })
    .then(res => res.json())
    .then(data => {
      const imgInfo = {
        name: data.name,
        link: data.link
      }
      const likeACard = () => api.addALike(data._id);
      const handleCardClick = () => { photoPopup.open(imgInfo) };
      initialCardList.addItem(getNewCard(data, templateCard, handleCardClick, likeACard));

      addNewCardPopup.close();

      submitButton.classList.add('popup__submit_disabled');
      submitButton.disabled = true;
    });
}

const addNewCardPopup = new PopupWithForm('.popup_type_add-new-card', submitAddCardForm);
profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
});
addNewCardPopup.setEventListeners();

// Удалила циклическую зависимость
// export { popupForDeleting };

// * МАССИВ С СЕРВЕРА
api.getInitialCards()
  .then(res => res.json())
  .then((items) => {
    items.forEach(item => {
        const likeACard = () => api.addALike(item._id);
        const handleCardClick = () => { photoPopup.open(item); };
      initialCardList.addItem(getNewCard(item, templateCard, handleCardClick, likeACard));
    })
    initialCardList.renderAll();
  })

const validUserInfo = new FormValidator(allSelectorClasses, popupFormTypeUserInfo);
const validAddCard = new FormValidator(allSelectorClasses, popupFormTypeAddCard);

validUserInfo.enableValidation();
validAddCard.enableValidation();
