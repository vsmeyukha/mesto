export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this.handleSubmit();
  }
}