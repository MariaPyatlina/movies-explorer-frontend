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
              })
              }
            </> :
            <>
              {props.savedMovies.length === 0 ? "у вас пока нет сохранённых фильмов" :
                <>
                  {props.savedMovies.map((movie) => { //Выводит сохраненые фильмы
                    return (
                      <MoviesCard
                        key={movie._id}
                        movie={movie}
                        savedMovies={props.savedMovies}
                        onRemoveMovie={props.onRemoveMovie}
                      />
                    )
                  })
                  }
                </>
              }

            </>

          }

        </div>
        <div className={`movies-cards__list-empty ${props.movies ? "" : "movies-cards__list-empty_hidden"}`}>Ничего не найдено</div>
        {location.pathname === '/movies' ?
          <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button>
          :
          <></>
        }

      </section>
    </>

  )

}

export default MoviesCardList;