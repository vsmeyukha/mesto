export default class UserInfo {
  constructor({ userNameSelector, userRegaliaSelector }) {
    this._userNameSelector = userNameSelector;
    this._userRegaliaSelector = userRegaliaSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._userNameSelector).textContent,
      regalia: document.querySelector(this._userRegaliaSelector).textContent
    }
  }

  // ! но это не по заданию!!!

  setUserInfo({ name, regalia }) {
    document.querySelector(this._userNameSelector).textContent = document.querySelector(name).value;
    document.querySelector(this._userRegaliaSelector).textContent = document.querySelector(regalia).value;
  }
}

// ! Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// ! Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  // ? done
// ! Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// ! Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

// ? почему-то в объект нельзя записать this.blablabla

