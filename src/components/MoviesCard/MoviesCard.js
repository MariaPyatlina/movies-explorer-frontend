import React from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { EXTERNAL_API_URL } from '../../utils/constants';

function MoviesCard(props) {
  const location = useLocation();

  // Добавлена ли карточка в сохранённые ?
  const isMovieSaved = (props.savedMovies || []).some(movie => movie.movieId === props.movie.id);

  function handleAddMovie(evt) {
    evt.preventDefault();

    const isMovieAlradySaved = (props.savedMovies || []).find(savedMovie => savedMovie.movieId === props.movie.id);

    if (isMovieAlradySaved === undefined) {
      props.onAddMovie(props.movie);
    }
  }

  function handleRemoveMovie(evt) {
    evt.preventDefault();
    props.onRemoveMovie(props.movie);
  }

  function handleRemoveSavedMovie(evt) {
    evt.preventDefault();
    props.onRemoveSavedMovie(props.movie);
  }

  function defineEnding(movieDuration) { // определяет окончание для длительности фильма
    let ending = '';
    const lastNumber = String(movieDuration).slice(-1); // приводит длительность фильма к строке и забирает последний символ
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

        {/* // Кнопка Сохранить / Удалить */}
        <div className="movies-card__action-button">
          {(location.pathname === "/movies") &&
            <button
              className={`movies-card__button ${isMovieSaved ? "movies-card__button_saved" : "movies-card__button_save"}`}
              type="button"
              onClick={isMovieSaved ? handleRemoveMovie : handleAddMovie}
            ></button>
          }

          {/* // Кнопка Удалить */}
          {(location.pathname === "/saved-movies") &&
            <button
              className="movies-card__button movies-card__button_remove"
              type="button"
              onClick={handleRemoveSavedMovie}
            >
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default MoviesCard;