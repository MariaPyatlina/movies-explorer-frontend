import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const location = useLocation();

  return (
    <>
      <section className="movies-cards">
        <div className="movies-card__list">
          {location.pathname === '/movies' ?
            <>
              {(props.movies.length === 0) ? <div className="movies-cards__list-empty">Ничего не найдено</div> :
                <>
                  {props.movies.map((movie) => { //Выводит фильмы с внешнего сервера
                    return (
                      <MoviesCard
                        key={movie.id}
                        movie={movie}
                        savedMovies={props.savedMovies}
                        onAddMovie={props.onAddMovie}
                        onRemoveMovie={props.onRemoveMovie}
                      // isMovieSaved={props.isMovieSaved}
                      />
                    )
                  })}
                </>
              }
            </>
            :
            <>{(props.savedMovies.length === 0) ? <div className="movies-cards__list-empty">Ничего не найдено</div> :
              <>
                {props.savedMovies.map((movie) => { //Выводит сохраненые фильмы
                  return (
                    <MoviesCard
                      key={movie._id}
                      movie={movie}
                      savedMovies={props.savedMovies}
                      onRemoveSavedMovie={props.onRemoveSavedMovie}
                    />
                  )
                })}
              </>
            }
            </>
          }
        </div>
      </section>

    </>
  )

}

export default MoviesCardList;