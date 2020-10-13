export default class UserInfo {
  constructor({ userNameSelector, userRegaliaSelector }) {
    this._userNameSelector = userNameSelector;
    this._userRegaliaSelector = userRegaliaSelector;

    this._userNameElement = document.querySelector(this._userNameSelector);
    this._userRegaliaElement = document.querySelector(this._userRegaliaSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      regalia: this._userRegaliaElement.textContent
    }
  }

  setUserInfo(name, regalia) {
    this._userNameElement.textContent = name;
    this._userRegaliaElement.textContent = regalia;
  }
}