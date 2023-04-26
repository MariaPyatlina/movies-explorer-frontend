import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import accountIcon from '../../images/accountIcon.svg';
import '../Header/Header.css';
import './Burger.css';

function Burger(props) {

    const location = useLocation();

    return (
        <>
            <input className="burger__checkbox" id="burger__checkbox" type="checkbox" />
            <label className="burger__menu-button" htmlFor="burger__checkbox">
                <span className={`burger__menu-button ${location.pathname === '/' ? "burger__menu-button_landing" : ""}`}></span>
            </label>

            <label className="burger__menu-button_close" htmlFor="burger__checkbox">
                <span className="burger__menu-button burger__menu-button_close"></span>
            </label>

            <label className="burger__menu-overlay" htmlFor="burger__checkbox"></label>

            <nav className="burger__menu-block">
                <ul className="burger__menu-list">
                    <li className="burger__menu-item">
                        <NavLink exact to="/" className="link" activeClassName="burger__menu-item_active">Главная</NavLink>
                    </li>
                    <li className="burger__menu-item">
                        <NavLink to="/movies" className="link" activeClassName="burger__menu-item_active">Фильмы</NavLink>
                    </li>
                    <li className="burger__menu-item">
                        <NavLink to="/saved-movies" className="link" activeClassName="burger__menu-item_active">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <Link to="/profile" className="link">
                    <button type="button" className="burger__account-button">
                        <span className="header__button-title_account">
                            <img src={accountIcon} alt="Кнопка Аккаунт" className="button__icon" />
                            Аккаунт
                        </span>
                    </button>
                </Link>
            </nav>
        </>
    )
}

export default Burger;