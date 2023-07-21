class MoviesApi {
  constructor() {
    this._url = 'https://api.nomoreparties.co/beatfilm-movies';
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
      .then((data) => {
        return data
      })
  }

  getAllMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }
}

export const moviesApi = new MoviesApi();
