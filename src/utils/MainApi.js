import { INTERNAL_API_URL, EXTERNAL_API_URL } from './constants';

export const config = {
  baseUrl: INTERNAL_API_URL,
  headers: { 'Content-Type': 'application/json' },
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl; //строка
    this._headers = options.headers; //Здесь можеть быть объект с несколькими заголовками
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  //Обработать ответы в запросах.
  _parseAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(res);
  }

  //------------КАРТОЧКИ ФИЛЬМОВ--------------------
  //Создает карточку в базе
  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    // thumbnail,
    id,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({// Поля в карточке фильма, которые отправляем
        country,
        director,
        duration,
        year,
        description,
        image: `${EXTERNAL_API_URL}${image.url}`,
        trailerLink,
        thumbnail: `${EXTERNAL_API_URL}${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU,
        nameEN,
      })
    })
      .then(res => this._parseAnswer(res))
  }

  // Получает все сохраненные карточки
  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    }) //В ответ придет массив карточек с сохраненными фильмами
      .then(res => this._parseAnswer(res))
  }

  // Удаляет карточку из базы
  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._parseAnswer(res))
  }


  //------------ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ--------------------
  //Забирает данные пользователя с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }) //В ответ придет объект пользователя
      .then(res => this._parseAnswer(res))
  }

  //Отправляет новые данные профиля
  setUserData({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      })
    }) //В ответ придет объект с обновленными данными пользователя
      .then(res => this._parseAnswer(res))
  }

  //------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ--------------------
  register({ password, email, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
        name,
      })
    })
      .then(res => this._parseAnswer(res))

  }

  authorize({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      })
    })
      .then(res => this._parseAnswer(res))
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => this._parseAnswer(res))
  }
}

const mainApi = new Api(config);

export default mainApi;