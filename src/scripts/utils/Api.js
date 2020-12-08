export default class Api {
  constructor(apiKey) {
    this.headers = {
      authorization: apiKey
    }
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'GET',
      headers: this.headers
    })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
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
      body: JSON.stringify({})
    })
  }

}