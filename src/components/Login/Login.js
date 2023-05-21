import React from "react";
import { Link, Route, Redirect } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import Preloader from '../Preloader/Preloader';
import '../Register/Register.css';

function Login(props) {
  return (
    props.isLoggedIn ? <Redirect to="/movies" /> :
      <>
        <section className="register">
          <Route path="/signin" className="link">
            <h1 className="header__title">
              Рады видеть!
            </h1>
          </Route>

          {props.isLoading ?
            <Preloader /> :
            <AuthForm
              buttonTitle="Войти"
              onLogin={props.onLogin}
              errorFromBack={props.errorFromBack}
            />
          }

          <span className="register__login">
            Ещё&nbsp;не&nbsp;зарегистрированы?
            <Link to="/signup" className="register__login-link">Регистрация</Link>
          </span>
        </section>
      </>
  );
}

export default Login;