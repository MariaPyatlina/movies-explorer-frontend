import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const handleClickMovies = () => {
    console.log('props.moviesCheckboxState', props.moviesCheckboxState);

    const newCheckboxState = !props.moviesCheckboxState;
    props.onCheckboxClick(newCheckboxState);
  }

  return (
    <>
      <label className="filter__lable" htmlFor="filter__checkbox">
        <input
          className="filter__checkbox"
          id="filter__checkbox"
          type="checkbox"
          onChange={handleClickMovies}
          checked={props.moviesCheckboxState}
        />
        <span className="filter__switcher" htmlFor="filter__checkbox">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckbox;