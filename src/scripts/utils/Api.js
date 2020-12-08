export default class Api {
  constructor(apiKey) {
    this.headers = {
      authorization: apiKey
    }
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'GET',
      headers: this.headers
    })
  }

  addNewCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  deleteCard() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${res._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'GET',
      headers: this.headers
    })
  }

  editProfile() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  changeAvatar() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers
    })
  }

  addALike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${res._id}`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  takeLikeBack() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${res._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}