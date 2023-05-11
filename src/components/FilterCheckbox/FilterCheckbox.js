import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {

  const handleClick = (evt) => {
    console.log('props.moviesCheckboxState', props.moviesCheckboxState);

    if (props.moviesCheckboxState === false) {
      evt.target.setAttribute("checked", "checked");
    } else {
      evt.target.removeAttribute("checked");
    }

    const newCheckboxState = !props.moviesCheckboxState;
    props.onCheckboxClick(newCheckboxState);
  }

  return (
    <>
      <label className="filter__lable" htmlFor="filter__checkbox">
        <input className="filter__checkbox" id="filter__checkbox" type="checkbox" onClick={handleClick} />
        <span className="filter__switcher" htmlFor="filter__checkbox">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckbox;