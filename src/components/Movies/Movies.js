import React from "react";
import './Movies';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  return (
    <>
      <SearchBlock
        moviesQuery={props.moviesQuery}
        onSearchSubmit={props.onSearchSubmit}
        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />
      {props.isLoading ?
        <Preloader /> :
        <MoviesCardList
          movies={props.movies}
          savedMovies={props.savedMovies}
          onAddMovie={props.onAddMovie}
          onRemoveMovie={props.onRemoveMovie}
          onRemoveSavedMovie={props.onRemoveSavedMovie}
          isLoading={props.isLoading}
        />}



      {/* <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button> */}

    </>

  )
}

export default Movies;