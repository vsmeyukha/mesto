// ! ИМПОРТИРУЕМ ДАННЫЕ ИЗ МОДУЛЕЙ

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import * as consts from '../scripts/utils/consts.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';
import Api from '../scripts/components/Api';
import PopupWithSubmit from "../scripts/components/PopupWithSubmit";
import { renderLoading } from '../scripts/utils/utils';

// ! ОБЪЯВЛЯЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

// * блок Profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileChangeAvatarButton = profile.querySelector('.profile__avatar-button');
const profileAvatar = document.querySelector('.profile__avatar-image');

// * popup Profile-Edit
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = document.querySelector('.popup__form_type_user-info');
const submitButtonForProfileEditing = popupProfileEdit.querySelector('.popup__submit');

// * попап добавления новой карточки
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');
const submitButtonForAddingNewCard = popupFormTypeAddCard.querySelector('.popup__submit');

// * попап смены авы
const popupFormTypeChangeAvatar = document.querySelector('.popup__form_type_user-avatar');
const submitButtonForChangingAva = popupFormTypeChangeAvatar.querySelector('.popup__submit');

// * секция cards, куда импортятся все карточки
const cardsSection = document.querySelector('.cards');

// * темплейт карточки
const templateCard = document.querySelector('#cards-template');

// * задаём селекторы попапов
const popupForDeletingSelector = '.popup_type_submit';
const editProfilePopupSelector = '.popup_type_profile-edit';
const popupForChangingAvaSelector = '.popup_type_change-avatar';
const addNewCardPopupSelector = '.popup_type_add-new-card';


// ! API

const apiKey = '2dbd0122-ea43-4557-862d-f5c5a66a918e';
const api = new Api(apiKey);
let myID = '';

// ! создаем фотопопап

const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

// ! функция удаления карточки, которая будет приходить в экземпляр PopupWithSubmit, созданный для удаления карточки. она принимает id, который задается методом setCurrentCardId в PopupWithSubmit
const deleteACard = (id) => {
  renderLoading(popupForDeletingSelector);
    return api.deleteCard(id)
      .then((data) => {
        console.log(`Карточка удалена, ID = ${id}`);
        popupForDeleting.close();
        document.getElementById(id).remove();
      })
      .catch(err => console.error(`Ошибка при удалении карточки: ${err}`));
}

// ! создаем попап подтверждения удаления

const popupForDeleting = new PopupWithSubmit(popupForDeletingSelector, deleteACard);
popupForDeleting.setEventListeners();

// ! создаем секшн и прочее для отрисовки карточек

const getNewCard = (item, templateCard, handleCardClick, likeACard, deleteLike, isBinVisible) => {
  const newCard = new Card(item, templateCard, handleCardClick, likeACard, deleteLike, popupForDeleting, isBinVisible);
  const visibleCard = newCard.getVisibleCard(item);
  return visibleCard;
}

// ? выносим пару раз использующиеся коллбэки в глобальную зону
const setLikesCount = (id, count) => {
  document.getElementById(id).querySelector('.card__like-scope').textContent = count;
}

const likeACard = (id) => () => api.addALike(id)
  .then(data => {
    setLikesCount(id, data.likes.length);
  })
  .catch(err => console.error(`Ошибка при лайке карточки: ${err}`));

const deleteLike = (id) => () => api.deleteLike(id)
  .then(data => {
    setLikesCount(id, data.likes.length);
  })
  .catch(err => console.error(`Ошибка при отзыве лайка карточки: ${err}`));

const handleCardClick = (item) => () => { photoPopup.open(item) };

const initialCardList = new Section({
  items: [],
  renderer: (item) => {
    const id = item._id;
    const isBinVisible = item.owner._id === myID;
    initialCardList.addItem(getNewCard(item, templateCard, handleCardClick(item), likeACard(id), deleteLike(id), isBinVisible));
  }
}, cardsSection);

// ! создаем все для изменения профиля
// ? изменение имени и регалий
const profileSelectors = {
  userNameSelector: '.profile__name',
  userRegaliaSelector: '.profile__regalia',
  userAvatarSelector: '.profile__avatar-image'
}

const submitProfileEditForm = (evt, values) => {
  evt.preventDefault();
  renderLoading(editProfilePopupSelector);
  const [name, about] = values;
  api.editProfile({ name, about })
    .then(data => {
      profileInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch(err => console.error(`Ошибка при редактировании профиля: ${err}`));
}

const profileInfo = new UserInfo(profileSelectors);

const validAddCard = new FormValidator(consts.validationConfig, popupFormTypeAddCard);
const validChangeAvatar = new FormValidator(consts.validationConfig, popupFormTypeChangeAvatar);
const validUserInfo = new FormValidator(consts.validationConfig, popupFormTypeUserInfo);

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, submitProfileEditForm, () => {
  validUserInfo.resetForm();
});

profileEditButton.addEventListener('click', () => {
  const { name, regalia } = profileInfo.getUserInfo();
  popupInputTypeName.value = name;
  popupInputTypeRegalia.value = regalia;
  if (submitButtonForProfileEditing.textContent === 'Сохранить') {
    editProfilePopup.open();
  } else {
    renderLoading(editProfilePopupSelector);
    editProfilePopup.open();
  }
});

editProfilePopup.setEventListeners();

// ? смена аватара
const changeAvatar = (evt, values) => {
  evt.preventDefault();
  const [avatar] = values;
  api.changeAvatar({ avatar })
    .then(data => {
      profileInfo.setAvatar(data.avatar);
    })
    .catch(err => console.error(`Ошибка при редактировании профиля: ${err}`));
    renderLoading(popupForChangingAvaSelector);
  popupForChangingAva.close();
}

const popupForChangingAva = new PopupWithForm(popupForChangingAvaSelector, changeAvatar, () => {
  validChangeAvatar.resetForm();
});

profileChangeAvatarButton.addEventListener('click', () => {

  if (submitButtonForChangingAva.textContent === 'Сохранить') {
    popupForChangingAva.open();
  } else {
    renderLoading(popupForChangingAvaSelector);
    popupForChangingAva.open();
  }
});
popupForChangingAva.setEventListeners();


// ! создаем все для добавления карточки

const submitAddCardForm = (evt, [name, link]) => {
  evt.preventDefault();
  renderLoading(addNewCardPopupSelector);
  api.addNewCard({ name, link })
    .then(item => {
      const id = item._id;
      const isBinVisible = item.owner._id === myID;
      initialCardList.addItem(getNewCard(item, templateCard, handleCardClick(item), likeACard(id), deleteLike(id), isBinVisible));

      addNewCardPopup.close();

      submitButtonForAddingNewCard.classList.add('popup__submit_disabled');
      submitButtonForAddingNewCard.disabled = true;
    })
    .catch(err => console.error(`Ошибка при добавлении карточки: ${err}`));
}

const addNewCardPopup = new PopupWithForm(addNewCardPopupSelector, submitAddCardForm, () => {
  validAddCard.resetForm();
});

profileAddButton.addEventListener('click', () => {
  if (submitButtonForAddingNewCard.textContent === 'Сохранить') {
    addNewCardPopup.open();
  } else {
    renderLoading(editProfilePopupSelector);
    addNewCardPopup.open();
  }
});

addNewCardPopup.setEventListeners();

api.getAllNeededData()
  .then((res) => {
    const [UserInfo, cards] = res;

    // ? получаем инфу о пользователе
    const { avatar, name, about, _id } = UserInfo;
    profileInfo.setUserInfo(name, about);
    profileAvatar.setAttribute('src', avatar);
    myID = _id;

    // ? получаем массив карточек
    cards.forEach(card => {
      const isBinVisible = card.owner._id === myID;
      const id = card._id;
      initialCardList.addItem(getNewCard(card, templateCard, handleCardClick(card), likeACard(id), deleteLike(id), isBinVisible));
    });
    initialCardList.renderAll();
  })
  .catch(err => console.error(`Ошибка: ${err}`));

validUserInfo.enableValidation();
validAddCard.enableValidation();
validChangeAvatar.enableValidation();

export {popupForDeletingSelector}