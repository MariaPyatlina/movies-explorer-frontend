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

                    {/* Ничего не найдено */}
                </div>

                <button className="movies-cards__button-more" type="button">Ещё</button>

            </section>
        </>

    )

}

export default MoviesCardList;