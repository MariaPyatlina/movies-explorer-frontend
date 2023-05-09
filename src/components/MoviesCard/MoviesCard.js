import React from "react";
import { Route, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { EXTERNAL_API_URL } from '../../utils/constants';

function MoviesCard(props) {
  const location = useLocation();

  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  function handleAddMovie(evt) {
    evt.preventDefault();
    props.onAddMovie(props.movie);
    setIsMovieSaved(true);
  }

  function handleRemoveMovie(evt) {
    evt.preventDefault();
    props.onRemoveMovie(props.movie);
    setIsMovieSaved(false);
  }

  function defineEnding(movieDuration) { // определяет окончание для длительности фильма
    let ending = '';
    const lastNumber = String(movieDuration).slice(-1); // приводит длительность фильма к строке и забирает последний символ
    if (lastNumber === '1') { return ending = 'а' };
    if (lastNumber === '2' || lastNumber === '3' || lastNumber === '4') { return ending = 'ы' };
    return ending;
  }

  function handleClassNameButton() { // определяет класс для кнопки Сохранить/ Удалить
    if (location.pathname === "/movies") {
      return `movies-card__button ${!isMovieSaved ? "movies-card__button_saved" : "movies-card__button_save"}`;
    }
    if (location.pathname === "/saved-movies") {
      return `movies-card__button movies-card__button_remove`;
    }
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
        <a className=""
          href={props.movie.trailerLink}
          target="_blank"
          rel="noreferrer">
          <img
            className="movies-card__image"
            src={location.pathname === "/movies" ? `${EXTERNAL_API_URL}${props.movie.image.url}` : `${props.movie.image}`}
            alt={props.movie.nameRU}
          />
        </a>

        <div className="movies-card__action-button">
          <button
            className={handleClassNameButton()}
            type="button"
            onClick={location.pathname === "/movies" && !isMovieSaved ? handleAddMovie : handleRemoveMovie}
          >
          </button>
        </div>
      </div>
    </>
  );
}

export default MoviesCard;