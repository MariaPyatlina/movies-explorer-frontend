import React from "react";
import { Route } from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
    return (
        <form className="auth-from">
            <Route path="/signup" className="link">
                <span className="auth-from__input-lable">Имя</span>
                <input
                    className="auth-from__input"
                    type="text"
                    name="user_name"
                    placeholder="">
                </input>
            </Route>

            <span className="auth-from__input-lable">Email</span>
            <input
                className="auth-from__input"
                type="email"
                name="user_email">
            </input>

            <span className="auth-from__input-lable">Пароль</span>
            <input
                className="auth-from__input auth-from__input-error"
                type="password"
                name="user_password">
            </input>
            <span className="auth-from__error">Что-то пошло не так...</span>

            <button className="auth-from__submit-button" type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default AuthForm;