import React from "react";
import { Link, Route } from 'react-router-dom';
import Header from '../Header/Header';
import AuthForm from "../AuthForm/AuthForm";
import '../Register/Register.css';

function Login(props) {
  return (
    <>
      {/* <Header /> */}
      <section className="register">

        <Route path="/signin" className="link">
          <h1 className="header__title">
            Рады видеть!
          </h1>
        </Route>

        <AuthForm
          buttonTitle="Войти"
          onLogin={props.onLogin}
          errorFromBack={props.errorFromBack}
        />

        <span className="register__login">
          Ещё&nbsp;не&nbsp;зарегистрированы?
          <Link to="/signup" className="register__login-link">Регистрация</Link>
        </span>
      </section>
    </>

  );
}

export default Login;