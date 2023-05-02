import './SearchForm.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function SearchForm(props) {
    const [query, setQuery] = React.useState(''); // исходно запрос пустой

    // React.useEffect(() => {

    // })

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        console.log('query', query);
    }


    const handleClick = (e) => {
        e.preventDefault();
        props.onSearchMovies(query);
    }

    return (
        <>
            <form className="search-form" id="search-form">
                <label className="search-form__input-form">
                    <input
                        value={query}
                        className='search-form__input'
                        id="search-movie-input"
                        name="search-movie-query"
                        type="text"
                        placeholder='Фильм'
                        minLength="3"
                        onChange={handleQueryChange}
                    >
                    </input>
                </label>
                <button
                    className="search-form__button"
                    type="submit"
                    onClick={handleClick}
                >
                    Найти
                </button>
            </form>

        </>

    )
}

export default SearchForm;