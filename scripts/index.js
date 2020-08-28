// * блок Profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileRegalia = document.querySelector('.profile__regalia');

// * popup Profile-Edit
const popupTypeProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = popupTypeProfileEdit.querySelector('.popup__form_type_user-info');

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
popupFormTypeUserInfo.addEventListener('submit', formSubmitHandler);

// ! массив карточек

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

// const addACard = function () {

//   const card = {
//       name: cardTitle.value,
//       link: cardLink.value
//   }
//   return card;
// }

// const addToForm = function (evt) {
//   evt.preventDefault();

//   initialCards.unshift(addACard());

//   togglePopup();
// }

// popupFormTypeAddCard.addEventListener('submit', addToForm);

// const testconsole = function () {
  
//   const card = {
//     name: profileName.textContent,
//     link: 'https://images.unsplash.com/photo-1597287258659-0b6391c0c5f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80'
//   }
//   return card;
// }
// initialCards.unshift(testconsole());

// initialCards.unshift({ name: 'oloооlo', link: 'https://images.unsplash.com/photo-1598377706489-bb127e4ce363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' });

// initialCards[1] = { name: 'zalupa', link: 'https://images.unsplash.com/photo-1597287258659-0b6391c0c5f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80' } // вот так обращаться к св-вам объекта, являющегося элементом массива


// ! создание новой карточки

const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');
const inputCardTitle = document.querySelector('.popup__input_type_card-title');
const inputCardLink = document.querySelector('.popup__input_type_card-link');
const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content.cloneNode(true);

const addACard = evt => {
  evt.preventDefault();

  cardTemplate.querySelector('.card__title').textContent = inputCardTitle.value;
  cardTemplate.querySelector('.card__img').src = inputCardLink.value;

  cardsSection.prepend(cardTemplate);
  
  togglePopup();
}

popupFormTypeAddCard.addEventListener('submit', addACard);


// ! рендеринг карточек

const addCards = card => {

  // создаем переменную для темплейта карточки
  const cardTemplate = document.querySelector('#cards-template').content.cloneNode(true);
  // создаем переменную для лайка внутри карточки
  const like = cardTemplate.querySelector('.card__like-button');

  // текстовое содержимое заголовка карточки равно значению параметра name переменной card
  cardTemplate.querySelector('.card__title').textContent = card.name;
  // ссылка на иллюстрации в карточке содержится в параметре link переменной card
  cardTemplate.querySelector('.card__img').src = card.link;

  // объявляем функцию, где прописан механизм лайка
  const addLike = evt => {
    // класс подставляется и убирается по клику (event) на объект (target)
    evt.target.classList.toggle('card__like-button_active');
  }
  
  //вешаем обработчик на кнопку. ВАЖНО: это происходит внутри функции создания карточек из массива
like.addEventListener('click', addLike);

  // вставляем получившуюся конструкцию в конец секции, записанной вп
  cardsSection.append(cardTemplate);
}

initialCards.forEach(addCards);

const like = cardTemplate.querySelector('.card__like-button');

const addLike = evt => {
  evt.target.classList.toggle('card__like-button_active');
  
}

like.addEventListener('click', addLike);






// ? это неправильный способ

// const toggleLike = () => {
//   like.classList.toggle('card__like-button_invisible');
//   dislike.classList.toggle('card__like-button_invisible');
// }

// like.addEventListener('click', toggleLike);
// dislike.addEventListener('click', toggleLike);

// ? еще один способ, но уебищный

// const cardLike = document.querySelector('.card__like');
// const like = document.querySelector('.card__like-button');

// const changeLike = (evt) => {
//   evtTarget = evt.target;

//   cardLike.src = '../images/heart_black.svg';
// }

// like.addEventListener('click', changeLike);