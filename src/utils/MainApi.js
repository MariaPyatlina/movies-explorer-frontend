import { INTERNAL_API_URL } from './constants';

//Обработать ответы в запросах.
const parseAnswer = (res) => {
    if (res.ok) {
        return res.json();
    }
    else Promise.reject(`Ошибка ${res.status}`);
}

//------------КАРТОЧКИ ФИЛЬМОВ--------------------
// Получает все сохраненные карточки
export const getAllSavedMovies = ({ }) => {
    return fetch(`${INTERNAL_API_URL}/cards`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }) //В ответ придет массив карточек с сохраненными фильмами
        .then(res => parseAnswer(res))
}

//Сохранять карточку в базе
export const saveMovie = ({ moveiTitle, movieImage, MovieDuration, movieLink }) => {
    return fetch(`${INTERNAL_API_URL}/cards`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({// Поля в карточке фильма, которые отправляем
            title: moveiTitle,
            image: movieImage,
            duration: MovieDuration,
            link: movieLink
        })
    })
        .then(res => parseAnsver(res))
}

// Удаляет карточку из базы
export const removeMovie = (cardId) => {
    return fetch(`${INTERNAL_API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => parseAnsver(res))
}



//------------ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ--------------------
//Забирает данные пользователя с сервера
export const getUserData = () => {
    return fetch(`${INTERNAL_API_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }) //В ответ придет объект пользователя
        .then(res => parseAnswer(res))
}

//Отправляет новые данные профиля
export const setUserData = ({ newUserName, newUserEmail }) => {
    return fetch(`${INTERNAL_API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newUserName,
            email: newUserEmail
        })
    }) //В ответ придет объект с обновленными данными пользователя
        .then(res => parseAnswer(res))
}

    //------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ--------------------

