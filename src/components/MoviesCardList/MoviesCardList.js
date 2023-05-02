import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

    return (
        <>
            <section className="movies-cards">
                <div className="movies-card__list">
                    {props.movies.map((movie) => {
                        return (
                            <MoviesCard
                                key={movie.id}
                                movie={movie} />
                        )
                    })}


                </div>
                <div className={`movies-cards__list-empty ${props.movies ? "" : "movies-cards__list-empty_hidden"}`}>Ничего не найдено</div>
                <button className={`movies-cards__button-more ${props.movies ? "movies-cards__button-more_hidden" : ""}`} type="button">Ещё</button>

            </section>
        </>

    )

}

export default MoviesCardList;