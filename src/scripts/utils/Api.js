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

  addNewCard(obj) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${id}`, {
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

  editProfile(obj) {
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

  addALike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${id}`, {
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