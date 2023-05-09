import React from "react";
import { Route, useLocation } from 'react-router-dom';
import './AuthForm.css';
import { useFormWithValidation } from '../../utils/validationHook';

function AuthForm(props) {
  const location = useLocation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({});


  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    console.log('handleSubmitRegister', values);
    props.onRegister({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    console.log('handleSubmitLogin', values);

    props.onLogin({
      email: values.email,
      password: values.password
    });
  }


  return (
    <form className="auth-from" id="auth-form-id" onSubmit={(location.pathname === "/signup" ? handleSubmitRegister : handleSubmitLogin)}>
      <Route path="/signup" className="link">
        <span className="auth-from__input-lable">Имя</span>
        <input
          className="auth-from__input"
          type="text"
          name="name"
          placeholder=""
          // required
          value={values.name || ''}
          onChange={handleChange}
        />
      </Route>

      <span className="auth-from__input-lable">Email</span>
      <input
        className="auth-from__input"
        type="email"
        name="email"
        // required
        value={values.email || ''}
        onChange={handleChange}
      />


      <span className="auth-from__input-lable">Пароль</span>
      <input
        className="auth-from__input auth-from__input-error"
        type="password"
        name="password"
        // required
        value={values.password || ''}
        onChange={handleChange}
      />

      <span className="auth-from__error">Что-то пошло не так...</span>

      <button className="auth-from__submit-button" type="submit" htmlFor="auth-form-id" >{props.buttonTitle}</button>
    </form>
  );
}

export default AuthForm;