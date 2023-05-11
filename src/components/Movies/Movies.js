import React from "react";
import './Movies';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import getMoviesCards from '../../utils/moviesApi';


function Movies(props) {

  return (
    <>
      <SearchBlock
        onChange={props.onChange}
        onSearchSubmit={props.onSearchSubmit}
        // onShortFilmFilter={props.onShortFilmFilter}
        moviesQuery={props.moviesQuery}
        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />


      <MoviesCardList
        movies={props.movies}
        savedMovies={props.savedMovies}
        onAddMovie={props.onAddMovie}
        onRemoveMovie={props.onRemoveMovie}
        onRemoveSavedMovie={props.onRemoveSavedMovie}
      // isMovieSaved={props.isMovieSaved}
      />

      {/* <div className={`movies-cards__list-empty ${props.movies ? "" : "movies-cards__list-empty_hidden"}`}>Ничего не найдено</div>
            <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button> */}

    </>

  )
}

export default Movies;