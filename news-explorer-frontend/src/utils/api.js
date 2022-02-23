class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  customFetch(url, headers) {
    return fetch(url, headers)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.statusText);
      });
  }

  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialArticles() {
    return this.customFetch(`${this._baseUrl}/articles`, {
      headers: this._headers,
    });
  }

  saveArticle(data) {
    return this.customFetch(`${this._baseUrl}/articles`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  deleteArticle(articleId) {
    return this.customFetch(`${this._baseUrl}/articles/${articleId}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  updateHeaders(token) {
    this._headers = { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  }
}

export const api = new Api({
  baseUrl: 'https://api.explorer.students.nomoreparties.sbs',
});

export default Api;
