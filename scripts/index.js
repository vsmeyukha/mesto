// * блок Profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileRegalia = document.querySelector('.profile__regalia');

// * popup Profile-Edit
const popupTypeProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupForm = popupTypeProfileEdit.querySelector('.popup__form');

// * объявляем функцию, которая вставляет и удаляет из HTML класс popup_opened
const togglePopupClass = function () {
  if (popupTypeProfileEdit.classList.contains('popup_opened') === false) {
    popupInputTypeName.value = profileName.textContent;
    popupInputTypeRegalia.value = profileRegalia.textContent;
  }  
  popupTypeProfileEdit.classList.toggle('popup_opened');
}

// * объявляем функцию, которая закрывает попап по клику в любое место на экране, кроме самого попапа (класс эл-та popup__container)
const closePopupOnClick = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  } togglePopupClass(event);
}

// ! ЗНАЧЕНИЯ, ВВЕДЕННЫЕ В ФОРМЫ, ПЕРЕДАЮТСЯ В БЛОК PROFILE

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = popupInputTypeName.value;
  profileRegalia.textContent = popupInputTypeRegalia.value;

  togglePopupClass();
}

// * навешиваем обработчики событий на кнопку edit в блоке profile и кнопку закрытия открытого попапа. по клику на эти эл-ты запускается функция togglePopupClass - добавление или удаление класса popup_opened
profileEditButton.addEventListener('click', togglePopupClass);
popupCloseButton.addEventListener('click', togglePopupClass);

// * навешиваем обработчик событий на фон попапа. по клику на фон попап закрывается.
popupTypeProfileEdit.addEventListener('click', closePopupOnClick);
popupForm.addEventListener('submit', formSubmitHandler);

// ! открытие и закрытие попапа добавления карточек

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeAddNewCard = document.querySelector('.popup_type_add-new-card');
const anotherCloseButton = document.querySelector('.another-close-button');

const togglePopup = () => {
  popupTypeAddNewCard.classList.toggle('popup_opened');
}

// ! закрытие попапа по клику в любое место
const closePopupOnPopupClick = (evt) => {
  if (evt.currentTarget === evt.target) {
    togglePopup(evt);
  } return;
}

profileAddButton.addEventListener('click', togglePopup);
anotherCloseButton.addEventListener('click', togglePopup);
popupTypeAddNewCard.addEventListener('click', closePopupOnPopupClick);

// ! рендеринг карточек

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Mozel',
    link: 'https://alcoholclub.ru/wp-content/uploads/2019/02/Pivo-kozel-Kozel-37.jpg'
  }
];

const cardsSection = document.querySelector('.cards');

const addCards = card => {
  const cardTemplate = document.querySelector('#cards-template').content.cloneNode(true);

  cardTemplate.querySelector('.card__title').textContent = card.name;
  cardTemplate.querySelector('.card__img').src = card.link;

  cardsSection.append(cardTemplate);
}

initialCards.forEach(addCards);