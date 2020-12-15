export default class UserInfo {
  constructor({ userNameSelector, userRegaliaSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userRegaliaSelector = userRegaliaSelector;
    this._userAvatarSelector = userAvatarSelector;

    this._userNameElement = document.querySelector(this._userNameSelector);
    this._userRegaliaElement = document.querySelector(this._userRegaliaSelector);
    this._userAvatarElement = document.querySelector(this._userAvatarSelector);
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

  getAvatar() {
    return {
      avatar: this._userAvatarElement.src
    }
  }

  setAvatar(avatar) {
    this._userAvatarElement.src = avatar;
  }
}

