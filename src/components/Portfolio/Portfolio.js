import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>

            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a className="portfolio__link"
                        href="https://mariapyatlina.github.io/how-to-learn/"
                        target="_blank"
                        rel="noreferrer">
                        <div className="portfolio__item-container">
                            <p className="portfolio__item-title">Статичный сайт</p>
                            <div className="portfolio__arrow-icon"></div>
                        </div>
                    </a>

                    <a className="portfolio__link"
                        href="https://mariapyatlina.github.io/russian-travel/index.html"
                        target="_blank"
                        rel="noreferrer">
                        <div className="portfolio__item-container">
                            <p className="portfolio__item-title">Адаптивный сайт</p>
                            <div className="portfolio__arrow-icon"></div>
                        </div>
                    </a>

                    <a className="portfolio__link"
                        href="https://mesto.for.students.nomoredomainsclub.ru"
                        target="_blank"
                        rel="noreferrer">
                        <div className="portfolio__item-container portfolio__item-container_last">
                            <p className="portfolio__item-title">Одностраничное приложение</p>
                            <div className="portfolio__arrow-icon"></div>
                        </div>
                    </a>

                </li>
            </ul>


        </section>

    )
}

export default Portfolio;