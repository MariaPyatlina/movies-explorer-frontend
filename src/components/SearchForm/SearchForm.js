import './SearchForm.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function SearchForm(props) {


    const handleClick = (e) => {
        e.preventDefault();
        props.onSearchMovies();
    }

    return (
        <>
            <form className="search-form" id="search-form">
                <label className="search-form__input-form">
                    <input className='search-form__input'
                        type="text"
                        placeholder='Фильм'>
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