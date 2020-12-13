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
const profileChangeAvatarButton = profile.querySelector('.profile__avatar-button');

// * popup Profile-Edit
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = document.querySelector('.popup__form_type_user-info');

// * попап добавления новой карточки
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');
const submitButton = popupFormTypeAddCard.querySelector('.popup__submit');

// * попап смены авы
const popupFormTypeChangeAvatar = document.querySelector('.popup__form_type_user-avatar');

// * секция cards, куда импортятся все карточки
const cardsSection = document.querySelector('.cards');

// * темплейт карточки
const templateCard = document.querySelector('#cards-template');

// ! API

const apiKey = '2dbd0122-ea43-4557-862d-f5c5a66a918e';
const api = new Api(apiKey);

// ! создаем фотопопап

const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

// ! функция удаления карточки, которая будет приходить в экземпляр PopupWithSubmit, созданный для удаления карточки. она принимает id, который задается методом setCurrentCardId в PopupWithSubmit
const deleteACard = (id) => {
  try {
      api.deleteCard(id)
          .then(res => {

              if (res.status === 403) {
                  throw new Error('Нет прав на удаление')
              }
              return res.json()
          })
          .then((data) => {
              const id = data._id;

              console.log(`Карточка удалена, ID = ${id}`);
          })
          .catch(err => console.error(`Ошибка при удалении карточки: ${err}`));
  } catch (err) {
    console.log('Нет прав на удаление');
  }

  popupForDeleting.close();
}

// ! создаем попап подтверждения удаления

const popupForDeleting = new PopupWithSubmit('.popup_type_submit', deleteACard);
popupForDeleting.setEventListeners();

// ! создаем секшн и прочее для отрисовки карточек

const getNewCard = (item, templateCard, handleCardClick, likeACard, takeLikeBack) => {
    const newCard = new Card(item, templateCard, handleCardClick, likeACard, takeLikeBack, popupForDeleting);
    return newCard.getVisibleCard(item);
}

// ? выносим пару раз использующиеся коллбэки в глобальную зону
const likeACard = (id) => () => api.addALike(id);
const takeLikeBack = (id) => () => api.takeLikeBack(id);
const handleCardClick = (item) => () => { photoPopup.open(item) };

const initialCardList = new Section({
  items: [],
  renderer: (item) => {
    likeACard(id);
    takeLikeBack(id);
    handleCardClick(item);
    initialCardList.addItem(getNewCard(item, templateCard, handleCardClick, likeACard, takeLikeBack));
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
  const [name, about] = values;
  api.editProfile({ name, about })
    .then(res => res.json())
    .then(data => {
      profileInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch(err => console.error(`Ошибка при редактировании профиля: ${err}`));
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

// ? получение информации о пользователе
api.getUserInfo()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    profileInfo.setUserInfo(data.name, data.about);
  })
  .catch(err => console.error(`Ошибка при получении информации о пользователе: ${err}`));

// ? смена аватара
const changeAvatar = (evt, values) => {
  evt.preventDefault();
  console.log(values);
  const [avatar] = values;
  api.changeAvatar({ avatar })
    .then(res => res.json())
    .then(data => {
      profileInfo.setAvatar(data.avatar);
    })
    .catch(err => console.error(`Ошибка при редактировании профиля: ${err}`));
  popupForChangingAva.close();
}

const popupForChangingAva = new PopupWithForm('.popup_type_change-avatar', changeAvatar);
profileChangeAvatarButton.addEventListener('click', () => {
  popupForChangingAva.open();
});
popupForChangingAva.setEventListeners();


// ! создаем все для добавления карточки

const submitAddCardForm = (evt, [name, link]) => {
  evt.preventDefault();

  api.addNewCard({ name, link })
    .then(res => res.json())
    .then(item => {
      likeACard(item._id);
      takeLikeBack(item._id);
      handleCardClick(item);
      const showBin = () => {
        if (item.owner._id !== apiKey) {
          getNewCard(item, templateCard, handleCardClick, likeACard, takeLikeBack).showTheBin();
        } else {
          return;
        }
      }
      showBin();

      initialCardList.addItem(getNewCard(item, templateCard, handleCardClick, likeACard, takeLikeBack));

      addNewCardPopup.close();

      submitButton.classList.add('popup__submit_disabled');
      submitButton.disabled = true;
    })
    .catch(err => console.error(`Ошибка при добавлении карточки: ${err}`));
}

const addNewCardPopup = new PopupWithForm('.popup_type_add-new-card', submitAddCardForm);

profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
});
addNewCardPopup.setEventListeners();



// * МАССИВ С СЕРВЕРА
api.getInitialCards()
  .then(res => res.json())
  .then((items) => {
    items.forEach(item => {
      initialCardList.addItem(getNewCard(item, templateCard, handleCardClick(item), likeACard(item._id), takeLikeBack(item._id)));
    });
    initialCardList.renderAll();
  })
  .catch(err => console.error(`Ошибка при получении изначального массива карточек: ${err}`));

const validUserInfo = new FormValidator(allSelectorClasses, popupFormTypeUserInfo);
const validAddCard = new FormValidator(allSelectorClasses, popupFormTypeAddCard);
const validChangeAvatar = new FormValidator(allSelectorClasses, popupFormTypeChangeAvatar);

validUserInfo.enableValidation();
validAddCard.enableValidation();
validChangeAvatar.enableValidation();
