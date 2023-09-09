class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  }

  getItems() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: 'include',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  createItem({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkStatus)
  }
  
  deleteItem(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers,
    })
    .then(this._checkStatus)
  }
  
  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkStatus)
  }
  
  editAvatar ({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkStatus)
  }
  
  like(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
  
  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    })
    .then(this._checkStatus)
  }
}

export const api = new Api({
  //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  baseUrl: 'https://api.mestogram.nomoredomainsicu.ru',
  headers: {
    //authorization: 'f10f5a64-3064-497a-969f-575534cc1185',
    'Content-Type': 'application/json',
  }
});

export default api;