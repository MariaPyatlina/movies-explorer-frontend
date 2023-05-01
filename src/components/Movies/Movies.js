import React from "react";
import './Movies';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies(props) {
    //Нужно проверять, если массив с карточками пустой, то блок с фильмами вообще отображать не нужно
    console.log('Movies', props.movies);
    return (
        <>
            <SearchBlock onSearchMovies={props.onSearchMovies} />
            <MoviesCardList movies={props.movies} />
            <></>
        </>
    )
}

export default Movies;