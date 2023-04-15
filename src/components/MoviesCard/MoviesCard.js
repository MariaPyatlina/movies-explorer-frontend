import React from "react";
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import imgTemplate from '../../images/image-template.svg';

function MoviesCard(props) {

    return (
        <div className="movies-card">
            <div className="movies-card__title">
                <h2 className="movies-card__header">В погоне за Бенкси</h2>
                <p className="movies-card__duration">27 минут</p>
            </div>

            <img className="movies-card__image" src={imgTemplate} alt={props.imgAlt} />

            <div className="movies-card__action-button">
                <Route path="/movies">
                    {props.isSaved ?
                        <button className="movies-card__button movies-card__button_saved"></button> :
                        <button className="movies-card__button movies-card__button_save"></button>
                    }
                </Route>

                <Route path="/saved-movies">
                    <button className="movies-card__button movies-card__button_remove"></button>
                </Route>
            </div>
        </div>
    )
}

export default MoviesCard;