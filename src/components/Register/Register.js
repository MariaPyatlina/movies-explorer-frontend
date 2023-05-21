import React from "react";
import { Link, Route, Redirect } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm'
import Preloader from '../Preloader/Preloader';
import './Register.css';

function Register(props) {
  return (
    props.isLoggedIn ? <Redirect to="/movies" /> :
      <>
        <section className="register">
          <Route path="/signup" className="link">
            <h1 className="header__title">
              Добро пожаловать!
            </h1>
          </Route>

          {props.isLoading ?
            <Preloader /> :
            <AuthForm
              buttonTitle="Зарегистрироваться"
              onRegister={props.onRegister}
              errorFromBack={props.errorFromBack}
            />
          }

          <span className="register__login">
            Уже&nbsp;зарегистрированы?
            <Link to="/signin" className="register__login-link">Войти</Link>
          </span>
        </section >
      </>

  );
}

export default Register;