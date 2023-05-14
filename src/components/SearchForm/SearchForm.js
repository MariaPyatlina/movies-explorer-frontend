import './SearchForm.css';
import React from 'react';

function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState(props.moviesQuery);

  const handleSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();

    if (searchQuery === '') {
      alert('Нужно ввести ключевое слово');
    }
    else {
      props.onSearchSubmit(searchQuery, props.moviesCheckboxState);
    }
  }

  return (
    <>
      <form
        className="search-form"
        id="search-form"
        onSubmit={handleSearchSubmit}
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