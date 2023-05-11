import React from "react";
import './Movies';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  return (
    <>
      <SearchBlock
        // onChange={props.onChange}
        moviesQuery={props.moviesQuery}
        onSearchSubmit={props.onSearchSubmit}
        // onShortFilmFilter={props.onShortFilmFilter}

        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />

      <MoviesCardList
        movies={props.movies}
        savedMovies={props.savedMovies}
        onAddMovie={props.onAddMovie}
        onRemoveMovie={props.onRemoveMovie}
        onRemoveSavedMovie={props.onRemoveSavedMovie}
      />

      {/* <div className={`movies-cards__list-empty ${props.movies ? "" : "movies-cards__list-empty_hidden"}`}>Ничего не найдено</div>
            <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button> */}

    </>

  )
}

export default Movies;