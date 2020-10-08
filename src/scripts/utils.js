

// ? БЛОК PROFILE И ИЗМЕНЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ

// * объявляем функцию, которая вставляет и удаляет из HTML класс popup_opened
const togglePopupClass = popup => {
  popup.classList.toggle('popup_opened');
}

// * объявляем функцию, которая закрывает попап по клику в любое место на экране, кроме самого попапа (класс эл-та popup__container)
const closePopupOnClick = event => {
  if (event.target !== event.currentTarget) {
    return;
  } togglePopupClass(event.target);
}

// ! ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ ПО КЛИКУ НА ESC
const closePopupOnEscPress = () => {
  const popupList = Array.from(document.querySelectorAll('.the-popup'));

  popupList.forEach(popup => {
    document.addEventListener('keydown', evt => {
      if (popup.classList.contains('popup_opened') && evt.key === 'Escape')
      {
        togglePopupClass(popup);
      }
    });
  })
}

export {
  togglePopupClass,
  closePopupOnClick,
  closePopupOnEscPress
}