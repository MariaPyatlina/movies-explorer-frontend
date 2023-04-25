import React from "react";
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>

            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__title-name">Мария</h3>
                    <p className="about-me__subtitle-job">Фронтенд-разработчик, 35лет</p>
                    <p className="about-me__subtitle-resume">
                        Я живу в Санкт-Петербурге, закончила факультет экономики НГУ.
                        У&nbsp;меня есть муж и сын. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                        Недавно начала кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошла курс по веб-разработке, начала заниматься фриланс&#8209;заказами.
                    </p>

                    <a className="about-me__github-link link"
                        href="https://github.com/MariaPyatlina"
                        target="_blank"
                        rel="noreferrer">
                        GitHub
                    </a>
                </div>
                <div className="about-me__photo"></div>
            </div>

            <Portfolio />
        </section >
    );
}

export default AboutMe;