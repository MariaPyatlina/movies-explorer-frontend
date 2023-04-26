import React from "react";
import './SearchBlock.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchBlock() {
    return (
        <section className="search-block">
            <SearchForm />
            <FilterCheckbox />
            <div className="search-block__stroke"></div>
        </section>

    );
}

export default SearchBlock;