// ! ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА

// * кнопка открытия попапа
let profileEditButton = document.querySelector('.profile__edit-button');

// * фон
let popup = document.querySelector('.popup');

// * кнопка закрытия попапа
let popupCloseButton = document.querySelector('.popup__close-button');

// * сам попап
let popupContainer = document.querySelector('.popup__container');

// * присваиваем переменным поля из блока profile
let profileName = document.querySelector('.profile__name');
let profileRegalia = document.querySelector('.profile__regalia');

// * присваиваем переменным инпуты из попапа
let popupInputTypeName = document.querySelector('.popup__input_type_name');
let popupInputTypeRegalia = document.querySelector('.popup__input_type_regalia');

let popupForm = popup.querySelector('.popup__form');

// * объявляем функцию, которая вставляет и удаляет из HTML класс popup_opened
let changePopupClass = function () {
  popup.classList.toggle('popup_opened');
}

// * объявляем функцию, которая закрывает попап по клику в любое место на экране, кроме самого попапа (класс эл-та popup__container)
let popupClose = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  } changePopupClass(event);
}

// ! ЗНАЧЕНИЯ, ВВЕДЕННЫЕ В ФОРМЫ, ПЕРЕДАЮТСЯ В БЛОК PROFILE

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = popupInputTypeName.value;
  profileRegalia.textContent = popupInputTypeRegalia.value;

  // ! Ирина, я не понял, что вы имеете в виду, говоря, что "данные должны заноситься в форму в момент открытия модального окна". поясните, пожалуйста. 
  popupInputTypeName.placeholder = profileName.textContent;
  popupInputTypeRegalia.placeholder = profileRegalia.textContent;

  changePopupClass();
}

// * навешиваем обработчики событий на кнопку edit в блоке profile и кнопку закрытия открытого попапа. по клику на эти эл-ты запускается функция changePopupClass - добавление или удаление класса popup_opened
profileEditButton.addEventListener('click', changePopupClass);
popupCloseButton.addEventListener('click', changePopupClass);

// * навешиваем обработчик событий на фон попапа. по клику на фон попап закрывается.
popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);

// ! Ирина, надеюсь, вы досюда дочитаете) не пойму один нюанс: когда вводишь что-то в формы в попапе, сохраняешь, закрываешь и открывааешь попап снова, эти значения сохраняются в формах, то есть они не в плейсхолдерах, а в value. почему так происходит и как это исправить? 