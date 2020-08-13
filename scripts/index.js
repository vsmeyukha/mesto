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

  // ! Ирина, я не понял, что вы имеете в виду, говоря, что "данные должны заноситься в форму в момент открытия модального окна". поясните, пожалуйста. 
  popupInputTypeName.placeholder = profileName.textContent;
  popupInputTypeRegalia.placeholder = profileRegalia.textContent;

  togglePopupClass();
}

// * навешиваем обработчики событий на кнопку edit в блоке profile и кнопку закрытия открытого попапа. по клику на эти эл-ты запускается функция togglePopupClass - добавление или удаление класса popup_opened
profileEditButton.addEventListener('click', togglePopupClass);
popupCloseButton.addEventListener('click', togglePopupClass);

// * навешиваем обработчик событий на фон попапа. по клику на фон попап закрывается.
popup.addEventListener('click', closePopupOnClick);
popupForm.addEventListener('submit', formSubmitHandler);

// ! Ирина, надеюсь, вы досюда дочитаете) не пойму один нюанс: когда вводишь что-то в формы в попапе, сохраняешь, закрываешь и открывааешь попап снова, эти значения сохраняются в формах, то есть они не в плейсхолдерах, а в value. почему так происходит и как это исправить? 