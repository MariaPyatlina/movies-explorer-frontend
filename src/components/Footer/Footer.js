import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const location = useLocation();

    if (location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies")
        return (
            <footer className="footer">
                <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className="footer__info">
                    <p className="footer__copyright">&#169;2023</p>
                    <nav className="footer__links-box">
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
                    </nav>
                </div>
            </footer>
        )
    else return <></>;
}

export default Footer;
