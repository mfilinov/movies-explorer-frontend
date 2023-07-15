class MainApi {
  constructor() {
    this._url = 'https://mfilinov.nomoredomains.rocks/api/';
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
        if (data.data) {
          return data.data
        } else {
          return data
        }
      })
  }

  register(name, email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
      .then(res => this._getResponseData(res));
  }
}

export const mainApi = new MainApi();
