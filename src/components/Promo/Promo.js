import React from "react";
import { Link } from "react-router-dom";
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
    return (

        <section className="promo">
            <div className="promo__landing">
                <div className="promo__landing-info">
                    <div className="promo__landing-title">
                        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    </div>
                    <a href="#about-project">
                        <button id="button-more" className="promo__button promo__button_more">Узнать больше</button>
                    </a>
                </div>

                <div className="promo__landing-info">
                    <div className="promo__landing-logo"></div>
                </div>
            </div>
            <NavTab />
        </section>

    );
}

export default Promo;