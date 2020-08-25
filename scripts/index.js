// * кнопка открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');

// * фон
const popup = document.querySelector('.popup');

// * кнопка закрытия попапа
const popupCloseButton = document.querySelector('.popup__close-button');

// * сам попап
const popupContainer = document.querySelector('.popup__container');

// * присваиваем переменным поля из блока profile
const profileName = document.querySelector('.profile__name');
const profileRegalia = document.querySelector('.profile__regalia');

// * присваиваем переменным инпуты из попапа
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');

// * вся форма попапа
const popupForm = popup.querySelector('.popup__form');

// * объявляем функцию, которая вставляет и удаляет из HTML класс popup_opened
const togglePopupClass = function () {
  if (popup.classList.contains('popup_opened') === false) {
    popupInputTypeName.value = profileName.textContent;
    popupInputTypeRegalia.value = profileRegalia.textContent;
  }  
  popup.classList.toggle('popup_opened');
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
popup.addEventListener('click', closePopupOnClick);
popupForm.addEventListener('submit', formSubmitHandler);

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
  }
];

const main = document.querySelector('.main');
const cardsSection = document.querySelector('.cards');

const addCard = card => {
  const cards = document.querySelector('#cards-template').content.cloneNode(true);

  cards.querySelector('.card__title').textContent = card.name;
  cards.querySelector('.card__img').src = card.link;

  cardsSection.append(cards);
}

initialCards.forEach(addCard);