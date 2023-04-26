import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    const history = useHistory();
    return (
        <section className="not-found-page">
            <div className="not-found-page__error-info">
                <h1 className="not-found-page__title">404</h1>
                <span className="not-found-page__subtitle">Страница не найдена</span>
            </div>

            <button className="not-found-page__back-link" type="button" onClick={() => history.goBack()}>Назад</button>
        </section>
    )
}

export default NotFoundPage;