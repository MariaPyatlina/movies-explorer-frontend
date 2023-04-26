import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import accountIcon from '../../images/accountIcon.svg';
import accountIconWhite from '../../images/accountIconWhite.svg';
import './Header.css';
import Burger from "../Burger/Burger";


const loggedIn = true;

function Header(props) {

    const location = useLocation();

    return (
        <>
            {location.pathname === "/" && (
                <>
                    <header className="header header_dark">
                        <Link to="/" className='link'>
                            <img className="header__logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>

                        <div className="header__buttons-container">
                            {loggedIn ? (
                                <>
                                    <Burger />
                                    <NavLink to="/movies" className="link header__link" activeClassName="header__link_active" >
                                        <button className="header__button header__button_dark header__button_hidden" type="button">
                                            <span className="header__button-title">Фильмы</span>
                                        </button>
                                    </NavLink>

                                    <NavLink to="/saved-movies" className="link header__link" activeClassName="header__link_active">
                                        <button className="header__button header__button_dark header__button_hidden" type="button">
                                            <span className="header__button-title">Сохраненные фильмы</span>
                                        </button>
                                    </NavLink>

                                    <Link to="/profile" className="link">
                                        <button className="header__button header__button_account header__button_hidden header__button_account_dark" type="button">
                                            <span className="header__button-title_account header__button-title_account_dark">
                                                <img src={accountIconWhite} alt="Кнопка Аккаунт" className="button__icon" />
                                                Аккаунт
                                            </span>
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="link">
                                        <button className="header__button header__button_dark" type="button">Регистрация</button>
                                    </Link>

                                    <Link to="/signin" className="link">
                                        <button className="header__button header__button_login" type="button">Войти</button>
                                    </Link>
                                </>
                            )
                            }
                        </div>
                    </header>
                </>
            )
            }

            {(location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile") && (
                <>
                    <header className="header">
                        <Link to="/" className='link'>
                            <img className="header__logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>

                        <div className="header__buttons-container">
                            <Burger />
                            <NavLink to="/movies" className="link">
                                <button className="header__button header__button_light header__button_hidden" type="button">
                                    <span className={`header__button-title ${location.pathname === "/movies" ? "header__button-title_selected" : ""}`}>Фильмы</span>
                                </button>
                            </NavLink>

                            <NavLink to="/saved-movies" className="link">
                                <button className="header__button header__button_light header__button_hidden" type="button">
                                    <span className={`header__button-title ${location.pathname === "/saved-movies" ? "header__button-title_selected" : ""}`}>Сохраненные фильмы</span>
                                </button>
                            </NavLink>

                            <Link to="/profile" className="link">
                                <button className="header__button header__button_account header__button_hidden" type="button">
                                    <span className="header__button-title_account">
                                        <img src={accountIcon} alt="Кнопка Аккаунт" className="button__icon" />
                                        Аккаунт
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </header>
                </>
            )
            }

            {(location.pathname === "/signin" || location.pathname === "/signup") && (
                <>
                    <header className="header_register">
                        <Link to="/" className='link'>
                            <img className="header__logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>
                    </header>
                </>
            )}
        </>
    );
}

export default Header;
