import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <section className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__info">
                <p className="footer__copyright">&#169;2023</p>
                <div className="footer__links-box">
                    <a className="footer__link"
                        href="https://practicum.yandex.ru/"
                        rel="noreferrer"
                        target="_blank">
                        Яндекс.Практикум
                    </a>
                    <a className="footer__link"
                        href="https://github.com/"
                        rel="noreferrer"
                        target="_blank">
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Footer;
