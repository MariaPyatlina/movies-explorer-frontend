import { EXTERNAL_API_URL } from './constants';

const getMoviesCards = () => {
  return fetch(`${EXTERNAL_API_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }) //В ответ придет массив с объектами фильмов
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else Promise.reject(`Ошибка ${res.status}`);
    })
}

export default getMoviesCards;