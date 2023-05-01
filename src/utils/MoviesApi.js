export const configMoviesApi = {
    baseUrl: ' https://api.nomoreparties.co',
    headers: { 'Content-Type': 'application/json' },
}

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }



    getMoviesCards() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: this._headers,
        }) //В ответ придет массив с объектами фильмов
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else Promise.reject(`Ошибка ${res.status}`);
            })
    }

}

const moviesApi = new Api(configMoviesApi);

export default moviesApi;