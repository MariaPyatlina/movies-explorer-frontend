import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './Profile.css';
import "../Register/Register.css";
import "../AuthForm/AuthForm.css"
import { useFormWithValidation } from '../../utils/validationHook';

import CurrentUserContext from '../../contexts/CurrentUserContext';

// const isEditMode = true;

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  //
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isError, setIsError] = React.useState(false);



  function handleEditMode() {
    setIsEditMode(true)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmitEditProfile', values);

    props.onProfileUpdate({
      email: values.email,
      name: values.name
    })
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
              required
              value={isEditMode ? values.name : currentUser.name}
              onChange={handleChange}
            />
          </label>

          <label className="profile__lable">
            <span className="profile__lable-title">E&#8209;mail</span>
            <input
              className="profile__input"
              name="email"
              type="email"
              required
              value={isEditMode ? values.email : currentUser.email}
              onChange={handleChange}
            />
          </label>
          {isEditMode && (<> {
            isError &&
            (<span className="profile__error">
              {props.errMessage} При обновлении профиля произошла ошибка.
            </span>)
          }
            <button
              className={`auth-from__submit-button auth-from__submit-button_profile ${isError ? "auth-from__submit-button_disabled" : ""}`}
              type="submit"
              form="id_form__profile"
              disabled={isError ? "disabled" : ""}
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