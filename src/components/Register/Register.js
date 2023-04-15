import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm'
import './Register.css';

function Register() {
    return (
        <section className="register">
            <Header />
            <AuthForm />

            <span className="register__login">
                Уже&nbsp;зарегистрированы?
                <Link to="/signin" className="register__login-link">Войти</Link>
            </span>
        </section >
    );
}

export default Register;