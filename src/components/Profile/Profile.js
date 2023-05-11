import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './Profile.css';
import "../Register/Register.css";
import "../AuthForm/AuthForm.css";

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/validationHook';


// const isEditMode = true;

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });


  console.log('values.name ', values['name']);


  const [isEditMode, setIsEditMode] = React.useState(false);

  // ошибка, которая придет с сервера. Возможно, будет пропсом
  const [isError, setIsError] = React.useState(false);


  function handleEditMode() {
    setIsEditMode(true)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onProfileUpdate({
      email: values.email,
      name: values.name
    });
    setIsEditMode(false);
  }

  // Разлогин
  const handleExit = () => {
    props.onExit();
  }

  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>

        <form className="profile__form" name="form__profile" id="id_form__profile" onSubmit={handleSubmit}>
          <label className="profile__lable">
            <span className="profile__lable-title">Имя</span>
            <input
              className="profile__input"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              required
              // pattern="[]"
              disabled={isEditMode ? false : true}
              value={values.name || ''}
              // value={isEditMode ? values.name : currentUser.name}

              onChange={handleChange}
            />
          </label>
          {isEditMode && errors && (
            <span className="profile__error-input">
              {errors.name}
            </span>
          )}

          <label className="profile__lable">
            <span className="profile__lable-title">E&#8209;mail</span>
            <input
              className="profile__input"
              name="email"
              type="email"
              required
              // pattern=""
              disabled={isEditMode ? false : true}
              value={values.email || ''}
              onChange={handleChange}
            />
          </label>
          {isEditMode && errors && (
            <span className="profile__error-input">
              {errors.email}
            </span>
          )}
          {isEditMode && (<> {
            props.errorFromBack &&
            (<span className="profile__error">
              {props.errMessage} При обновлении профиля произошла ошибка.
            </span>)
          }
            <button
              className={`auth-from__submit-button auth-from__submit-button_profile ${!isValid || (currentUser.name === values['name'] && currentUser.email === values['email']) ? "auth-from__submit-button_disabled" : ""}`}
              type="submit"
              form="id_form__profile"
              disabled={!isValid || (currentUser.name === values['name'] && currentUser.email === values['email']) ? true : false}
            >
              Сохранить
            </button>
          </>
          )}
        </form>

        {!isEditMode && (
          (<>
            <button
              className="profile__link_edit"
              type="button"
              onClick={handleEditMode}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__link_exit" onClick={handleExit}>Выйти из аккаунта</Link>
          </>
          )
        )}
      </section >
    </>
  );
}

export default Profile;