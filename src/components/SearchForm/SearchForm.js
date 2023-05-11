import './SearchForm.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState(props.moviesQuery); // исходно запрос пустой

  console.log('props.moviesCheckboxState в форме поиска', props.moviesCheckboxState);

  const handleSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    console.log('searchQuery', searchQuery);
    console.log('Нажали Найти');

    props.onSearchSubmit(searchQuery, props.moviesCheckboxState);
  }

  const handleLocalSeachSubmit = (evt) => {
    evt.preventDefault();
    console.log('localSearchSubmit', searchQuery, props.moviesCheckboxState);
    props.onSearchSubmit(searchQuery, props.moviesCheckboxState);
  }

  return (
    <>
      <form
        className="search-form"
        id="search-form"
        onSubmit={location.pathname === "/movies" ? handleSearchSubmit : handleLocalSeachSubmit}
      >
        <label className="search-form__input-form">
          <input
            value={searchQuery}
            className='search-form__input'
            id="search-movie-input"
            name="search-movie-query"
            type="text"
            placeholder='Фильм'
            minLength="1"
            onChange={handleSearchQueryChange}
          >
          </input>
        </label>
        <button
          className="search-form__button"
          type="submit"
        >
          Найти
        </button>
      </form>

    </>

  )
}

export default SearchForm;