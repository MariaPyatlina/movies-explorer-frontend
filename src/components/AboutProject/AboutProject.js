import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>

            <div className="about-project__table">
                <div className="about-project__column">
                    <h3 className="about-project__table-header">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__table-item">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>

                <div className="about-project__column">
                    <h3 className="about-project__table-header">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__table-item">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>

            <div className="about-project__grid">
                <div className="back-header">
                    <span className="about-project__grid-header">1 неделя</span>
                </div>
                <div className="front-header">
                    <span className="about-project__grid-header">4 недели</span>
                </div>

                <div className="back-text">
                    <span className="about-project__grid-text">Back-end</span>
                </div>
                <div className="front-text">
                    <span className="about-project__grid-text">Front-end</span>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;