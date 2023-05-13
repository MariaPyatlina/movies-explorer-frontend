import React from "react";
import { Route, useLocation } from 'react-router-dom';
import './AuthForm.css';
import { useFormWithValidation } from '../../utils/validationHook';

function AuthForm(props) {
  const location = useLocation();
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  console.log('errors', errors);

  // ошибка, которая придет с сервера. Возможно, будет пропсом
  // const [isError, setIsError] = React.useState(false);
  console.log('errorFromBack в форме регистрации', props.errorFromBack);


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
    <form
      className="auth-from"
      id="auth-form-id"
      noValidate
      onSubmit={(location.pathname === "/signup" ? handleSubmitRegister : handleSubmitLogin)}
      action="#"
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
        // required
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
          {props.errMessage}
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