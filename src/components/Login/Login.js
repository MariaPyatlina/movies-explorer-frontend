import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import AuthForm from "../AuthForm/AuthForm";
import '../Register/Register.css';

function Login() {
    return (
        <section className="register">
            <Header />
            <AuthForm />

            <span className="register__login">
                Ещё&nbsp;не&nbsp;зарегистрированы?
                <Link to="/signup" className="register__login-link">Регистрация</Link>
            </span>
        </section>
    );
}

export default Login;