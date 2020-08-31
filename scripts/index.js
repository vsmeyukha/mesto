// ! ОБЪЯВЛЯЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

// * блок Profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileRegalia = profile.querySelector('.profile__regalia');
const profileAddButton = profile.querySelector('.profile__add-button');

// * popup Profile-Edit
const popupTypeProfileEdit = document.querySelector('.popup_type_profile-edit'); // попапы не делить по функционалу. они одинаковые, надо, значит, чтобы было только одно обращение к попапу
const popupCloseButton = document.querySelector('.popup__close-button'); // чекнуть, будет ли работать, если обращаться к элементам попапов через попап квери селектор, а не через документ. ведь попапов два, может, он найдет первый, глянет, что в нем нет селекторов элементов второго попапа, и пиздец
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');
const popupFormTypeUserInfo = document.querySelector('.popup__form_type_user-info');

// * попап добавления новой карточки
const popupTypeAddNewCard = document.querySelector('.popup_type_add-new-card');
const anotherCloseButton = document.querySelector('.another-close-button'); // вот этой хуйни быть не должно
const popupFormTypeAddCard = document.querySelector('.popup__form_type_add-card');
const inputCardTitle = document.querySelector('.popup__input_type_card-title');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

// * секция cards, куда импортятся все карточки
const cardsSection = document.querySelector('.cards');

// * попап с большой фоткой
const photoPopup = document.querySelector('.photo-popup');

// * шаблон карточки
const cardTemplate = document.querySelector('#cards-template').content.cloneNode(true);
const like = cardTemplate.querySelector('.card__like-button');

// ! ФУНКЦИИ

// * объявляем функцию, которая вставляет и удаляет из HTML класс popup_opened
// допилить, чтобы эта функция работала с обоими одинаковыми попапами
const togglePopupClass = () => {
  popupTypeProfileEdit.classList.toggle('popup_opened');
}

// * объявляем функцию, которая закрывает попап по клику в любое место на экране, кроме самого попапа (класс эл-та popup__container)
// то же самое - должна работать с двумя одинаковыми попапами
const closePopupOnClick = event => {
  if (event.target !== event.currentTarget) {
    return;
  } togglePopupClass(event);
}

// * объявляем функцию, которая передает введенные в формы значения на обработку
// возможно, тоже допилить, чтоюы она юзалась обоими попапами. типа, равенства перенести в ф-ию-обработчик, и обработчику уже передавать вот ету функцию без персонификации
const formSubmitHandler = evt => {
  evt.preventDefault(); 

  profileName.textContent = popupInputTypeName.value;
  profileRegalia.textContent = popupInputTypeRegalia.value;

  togglePopupClass();
}

// * объявляем функцию, которой не должно быть - она дублирует функцию открытия и закрытия первого попапа.
const togglePopup = () => {
  popupTypeAddNewCard.classList.toggle('popup_opened');
}

// * также функция, которой не должно быть = закрытие второго попапа по клику в любое место
const closePopupOnPopupClick = evt => {
  if (evt.currentTarget === evt.target) {
    togglePopup(evt);
  } return;
}

// * объявляем функцию для создания новой карточки вне массива
const addACard = evt => {
  evt.preventDefault();

  cardTemplate.querySelector('.card__title').textContent = inputCardTitle.value;
  cardTemplate.querySelector('.card__img').src = inputCardLink.value;

  cardsSection.prepend(cardTemplate);
  
  togglePopup();
}

// * объявляем функцию для лайканья карточек вне массива
const addLike = evt => {
  evt.target.classList.toggle('card__like-button_active');
  
}

// * объявляем функцию для открытия/закрытия попапа с большим фото
const openBigPhoto = () => {
  photoPopup.querySelector('.photo-popup__image').src = inputCardLink.value;
  photoPopup.querySelector('.photo-popup__caption').textContent = inputCardTitle.value;

  photoPopup.classList.toggle('photo-popup_opened');
}

// * объявляем функцию для закрытия попапа с большим фото по клику на фон
const closeBigPhoto = evt => {
  if (evt.currentTarget === evt.target) {
    photoPopup.classList.toggle('photo-popup_opened'); // ? вот тут, можа бы, переиспользовать код из функции выше. типа равенства вынести из той функции, а ту функцию просто подставить сюда, вместо того, чтобы еще раз ту же строку кода писать
    console.log(evt.target);
  } return;
}


// ! ОБРАБОТЧИКИ

// * вешаем обработчики на кнопку edit в блоке profile и кнопку закрытия открытого попапа
// ? вот тут получилось заебись. реально сэкономим кучу кода благодаря вынесению конкретных условий в обработчик, 
profileEditButton.addEventListener('click', function () {
  if (popupTypeProfileEdit.classList.contains('popup_opened') === false) {
    popupInputTypeName.value = profileName.textContent;
    popupInputTypeRegalia.value = profileRegalia.textContent;
  }
  togglePopupClass();
});
popupCloseButton.addEventListener('click', togglePopupClass);

// * вешаем обработчик событий на фон попапа. по клику на фон попап закрывается.
popupTypeProfileEdit.addEventListener('click', closePopupOnClick);

// * вешаем обработчик на форму первого попапа - попап по клику на кнопку "сохранить" закрывается
popupFormTypeUserInfo.addEventListener('submit', formSubmitHandler);

// * вешаем обработчик на кнопку с плюсиком в блоке profile. по клику на кнопку открывается второй попап
profileAddButton.addEventListener('click', togglePopup);
// * вешаем обработчик на крестик во втором попапе
anotherCloseButton.addEventListener('click', togglePopup);
// * вешаем обработчик на второй попап - по клику на фон попап закрывается
popupTypeAddNewCard.addEventListener('click', closePopupOnPopupClick);

// * вешаем обработчик на форму второго попапа. по клику на кнопку "сохранить" добавляется новая карточка
popupFormTypeAddCard.addEventListener('submit', addACard);

// * вешаем обработчик на лайк карточки вне массива
like.addEventListener('click', addLike);

// * вешаем обработчик на фотку в карточке вне массива, чтобы по клику по фотке открывался попап с большой фоткой
cardTemplate.querySelector('.card__img').addEventListener('click', openBigPhoto);

// * вешаем обработчик на кнопку закрытия большого попапа
photoPopup.querySelector('.photo-popup__close-button').addEventListener('click', openBigPhoto);

// * вешаем обработчик на фон попапа с большим фото. по клику на фон попап закрывается
photoPopup.addEventListener('click', closeBigPhoto);


// ! МАССИВ КАРТОЧЕК

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


// ! рендеринг карточек

const addCards = card => {

  // создаем переменную для темплейта карточки
  const cardTemplate = document.querySelector('#cards-template').content.cloneNode(true);
  // создаем переменную для лайка внутри карточки
  const like = cardTemplate.querySelector('.card__like-button');
  // создаем переменную для иконки корзины внутри карточки
  const bin = cardTemplate.querySelector('.card__delete-card');

  // текстовое содержимое заголовка карточки равно значению параметра name переменной card
  cardTemplate.querySelector('.card__title').textContent = card.name;
  // ссылка на иллюстрацию в карточке содержится в параметре link переменной card
  cardTemplate.querySelector('.card__img').src = card.link;

  // ! объявляем функцию, где прописан механизм лайка
  const addLike = evt => {
    // класс подставляется и убирается по клику (event) на объект (evt.target)
    evt.target.classList.toggle('card__like-button_active');
  }

  // ! объявляем функцию, где прописан механизм удаления карточки
  const deleteCard = evt => {
    const cardToDelete = evt.target.closest('.card');

    cardToDelete.remove();
  }

  // создаем переменную для попапа с большим фото
const photoPopup = document.querySelector('.photo-popup');
  
  // ! объявляем функцию для открытия большого фото
  const openBigPhoto = () => {
    photoPopup.querySelector('.photo-popup__image').src = card.link;
    photoPopup.querySelector('.photo-popup__caption').textContent = card.name;

    photoPopup.classList.toggle('photo-popup_opened');
  }
  
  cardTemplate.querySelector('.card__img').addEventListener('click', openBigPhoto);

  // вешаем обработчик на иконку корзины
  bin.addEventListener('click', deleteCard);
  
  //вешаем обработчик на кнопку. ВАЖНО: это происходит внутри функции создания карточек из массива
  like.addEventListener('click', addLike);

  // вставляем получившуюся конструкцию в конец секции, записанной в переменную cardsSection
  cardsSection.append(cardTemplate);
}

// передаем получившуюся функцию аргументом методу forEach массива initialCards, и все становится хорошо
initialCards.forEach(addCards);