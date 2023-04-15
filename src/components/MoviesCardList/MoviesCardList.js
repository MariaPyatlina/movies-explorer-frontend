import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {

    return (
        <section className="movies-cards">
            <div className="movies-card__list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>

            <button className="movies-cards__button-more" type="button">Ещё</button>

        </section>
    )

}

export default MoviesCardList;