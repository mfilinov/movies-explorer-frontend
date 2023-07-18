class MainApi {
  constructor() {
    this._url = 'https://mfilinov.nomoredomains.rocks/api/';
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject({status: res.status, res: res})
    }
    return res.json().then((data) => data.data || data)
  }

  getSavedMovies(){
    return fetch(`${this._url}movies`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  createSavedMovie(movie) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie)
    })
      .then(res => this._getResponseData(res));
  }

  deleteSavedMovie(movieId) {
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  getUser() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  updateUserProfile(name, email) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(res => this._getResponseData(res));
  }

  login(email, password) {
    const data = {email, password};
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._getResponseData(res));
  }

  register(name, email, password) {
    const data = {name, email, password};
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._getResponseData(res));
  }

  setToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`
  }

}

export const mainApi = new MainApi();
