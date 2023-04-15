import React from "react";
import { Link } from 'react-router-dom';
import './Profile.css';
import "../Register/Register.css";
import "../AuthForm/AuthForm.css"
import Header from "../Header/Header";

const isEditMode = true;

function Profile(props) {
    return (
        <>
            <Header />
            <section className="profile">
                <h2 className="profile__title">Привет, Мария {props.userName}</h2>

                <form className="profile__form" name="form__profile" id="id_form__profile">
                    <lable className="profile__lable">
                        <span className="profile__lable-title">Имя</span>
                        <input className="profile__input" name="user_name" type="text" required defaultValue="Мария">
                            {props.userName}
                        </input>
                    </lable>

                    <lable className="profile__lable">
                        <span className="profile__lable-title">E&#8209;mail</span>
                        <input className="profile__input" name="user_email" type="email" required defaultValue="pochta@yandex.ru">
                            {props.userEmail}
                        </input>
                    </lable>
                </form>

                {isEditMode ?
                    (<>
                        <span className="profile__error">
                            {props.errMessage} При обновлении профиля произошла ошибка.
                        </span>
                        <button className="auth-from__submit-button auth-from__submit-button_profile auth-from__submit-button_disabled" type="submit" form="id_form__profile">
                            Сохранить
                        </button>
                    </>
                    ) :
                    (<>
                        <button className="profile__link_edit" type="button">
                            Редактировать
                        </button>
                        <Link to="/" className="profile__link_exit">Выйти из аккаунта</Link>
                    </>
                    )
                }

            </section >
        </>
    );
}

export default Profile;