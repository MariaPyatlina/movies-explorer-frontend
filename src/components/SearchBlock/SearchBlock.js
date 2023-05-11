import React from "react";
import './SearchBlock.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchBlock(props) {

  return (
    <section className="search-block">
      <SearchForm
        value={props.searchQuery}
        onChange={props.onChange}
        onSearchSubmit={props.onSearchSubmit}
        moviesQuery={props.moviesQuery}
        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />

      <FilterCheckbox
        // onShortFilmFilter={props.onShortFilmFilter}
        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />

      <div className="search-block__stroke"></div>

    </section>

  );
}

export default SearchBlock;