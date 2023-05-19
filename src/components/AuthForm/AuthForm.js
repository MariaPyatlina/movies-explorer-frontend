import React from "react";
import { Route, useLocation } from 'react-router-dom';
import './AuthForm.css';
import { useFormWithValidation } from '../../utils/validationHook';

function AuthForm(props) {
  const location = useLocation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    props.onRegister({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    props.onLogin({
      email: values.email,
      password: values.password
    });
  }


  return (
    <form
      className="auth-from"
      id="auth-form-id"
      noValidate
      onSubmit={(location.pathname === "/signup" ? handleSubmitRegister : handleSubmitLogin)}
    >
      <Route path="/signup" className="link">
        <span className="auth-from__input-lable">Имя</span>
        <input
          className="auth-from__input"
          type="text"
          name="name"
          placeholder=""
          required
          pattern="[A-Za-zА-Яа-яЁё\s-]{2,30}"
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && <span className="auth-from__error">{errors.name}</span>}
      </Route>

      <span className="auth-from__input-lable">Email</span>
      <input
        className="auth-from__input"
        type="email"
        name="email"
        required
        pattern="[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{2,}"
        value={values.email || ''}
        onChange={handleChange}
      />
      {errors.email && <span className="auth-from__error">{errors.email}</span>}


      <span className="auth-from__input-lable">Пароль</span>
      <input
        className={`auth-from__input ${errors.password ? "auth-from__input-error" : ""}`}
        type="password"
        name="password"
        required
        value={values.password || ''}
        onChange={handleChange}
      />
      {errors.password && <span className="auth-from__error">{errors.password}</span>}

      {props.errorFromBack && (
        <span className="profile__error">
          {props.errorFromBack}
        </span>
      )}

      <button
        className={`auth-from__submit-button ${isValid ? "" : "auth-from__submit-button_disabled"}`}
        disabled={isValid ? false : true}
        type="submit"
        htmlFor="auth-form-id"
      >
        {props.buttonTitle}
      </button>
    </form>
  );
}

export default AuthForm;