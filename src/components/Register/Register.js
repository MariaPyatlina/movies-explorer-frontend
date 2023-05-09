import React from "react";
import { Link, Route } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm'
import './Register.css';

function Register(props) {
  return (
    <>
      <section className="register">
        <Route path="/signup" className="link">
          <h1 className="header__title">
            Добро пожаловать!
          </h1>
        </Route>
        <AuthForm onRegister={props.onRegister} buttonTitle="Зарегистрироваться" />
        <span className="register__login">
          Уже&nbsp;зарегистрированы?
          <Link to="/signin" className="register__login-link">Войти</Link>
        </span>
      </section >
    </>

  );
}

export default Register;