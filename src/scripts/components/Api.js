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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
      }
    })
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }

  changeAvatar(obj) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }

  addALike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }

  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      });
  }
}