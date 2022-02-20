export const BASE_URL = 'https://api.explorer.students.nomoreparties.sbs';
// export const BASE_URL = 'http://localhost:3000';

const _checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.statusText);
};

export const register = (email, password, name) => {
  return fetch(
    `${BASE_URL}/signup`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => _checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(
    `${BASE_URL}/signin`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => _checkResponse(res));
};

export const getContent = (token) => {
  return fetch(
    `${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => _checkResponse(res));
};
