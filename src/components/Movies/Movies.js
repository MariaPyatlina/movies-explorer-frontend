import React, { useEffect } from "react";
import './Movies';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  // console.log('фильмы для отображения', props.movies);



  const handleMoreClick = (evt) => {
    evt.preventDefault();
    props.onMoreClick(props.movies);
  }



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


      {props.isMoreButtonShown && (
        <button
          // className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`}
          className={`movies-cards__button-more `}

          type="button"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}


    </>

  )
}

export default Movies;