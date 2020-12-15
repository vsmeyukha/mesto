const renderLoading = (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const submitButton = popup.querySelector('.popup__submit');
  if (submitButton.textContent === 'Сохранить' || submitButton.textContent === 'Да') {
    submitButton.textContent = 'Подожди чутка'
  } else {
    if (popupSelector === '.popup_type_profile-edit' || popupSelector === '.popup_type_change-avatar' || popupSelector === '.popup_type_add-new-card') {
      submitButton.textContent = 'Сохранить';
    } else {
      submitButton.textContent = 'Да';
    }
  }
}

export { renderLoading };