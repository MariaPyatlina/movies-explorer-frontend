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
            {(props.movies === []) ?
                <></> :
                <MoviesCardList movies={props.movies} />
            }

            {/* <div className={`movies-cards__list-empty ${props.movies ? "" : "movies-cards__list-empty_hidden"}`}>Ничего не найдено</div>
            <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button> */}

        </>

    )
}

export default Movies;