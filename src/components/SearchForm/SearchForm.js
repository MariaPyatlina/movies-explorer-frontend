import './SearchForm.css';

function SearchForm() {
    return (

        <div className="search-form">
            <label className="search-form__input-form">
                <input className='search-form__input'
                    type="text"
                    placeholder='Фильм'>
                </input>
            </label>
            <button className="search-form__button">Найти</button>
        </div>
    )
}

export default SearchForm;