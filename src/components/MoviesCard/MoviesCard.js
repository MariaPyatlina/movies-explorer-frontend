import React from "react";
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import EXTERNAL_API_URL from '../../utils/constants';

function MoviesCard(props) {

    const [isMovieSaved, setIsMovieSaved] = React.useState(false);

    function handleClick() {
        setIsMovieSaved(!isMovieSaved);
    }

    function handleRemoveClick() { }

    function defineEnding(movieDuration) { // определяет окончание для длительности фильма
        let ending = '';
        const lastNumber = String(movieDuration).slice(-1); // приводит длительностьфильма к строке и забирает последний символ

        if (lastNumber === '1') { return ending = 'а' };
        if (lastNumber === '2' || lastNumber === '3' || lastNumber === '4') { return ending = 'ы' };

        return ending;
    }

    return (
        <>
            <div className="movies-card">
                <div className="movies-card__title">
                    <h2 className="movies-card__header">{props.movie.nameRU}</h2>
                    <p className="movies-card__duration">
                        {props.movie.duration} минут{defineEnding(props.movie.duration)}
                    </p>
                </div>
                <img className="movies-card__image" src={`${EXTERNAL_API_URL}${props.movie.image.url}`} alt={props.movie.nameRU} />

                <div className="movies-card__action-button">
                    <Route path="/movies">
                        <button
                            className={`movies-card__button ${isMovieSaved ? "movies-card__button_saved" : "movies-card__button_save"}`}
                            type="button"
                            onClick={handleClick}
                        >
                        </button>

                    </Route>

                    <Route path="/saved-movies">
                        <button
                            className="movies-card__button movies-card__button_remove"
                            type="button"
                            onClick={handleRemoveClick}
                        >

                        </button>
                    </Route>
                </div>
            </div>
        </>
    );
}

export default MoviesCard;