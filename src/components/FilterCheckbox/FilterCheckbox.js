import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  // const [isShortMoviesOn, setIsShortMoviesOn] = React.useState(props.moviesCheckboxState); // Состояние чекбокса по умолчани выключено



  const handleClick = (evt) => {
    console.log('props.moviesCheckboxState', props.moviesCheckboxState);
    // console.log('isShortMoviesOn', isShortMoviesOn);
    if (props.moviesCheckboxState === false) {
      evt.target.setAttribute("checked", "checked");
      // props.onCheckboxClick(isShortMoviesOn);
    } else {
      evt.target.removeAttribute("checked");
      // setIsShortMoviesOn(!isShortMoviesOn);
    }

    const newCheckboxState = !props.moviesCheckboxState;
    // setIsShortMoviesOn(!isShortMoviesOn);
    // console.log('isShortMoviesOn 1', isShortMoviesOn);
    props.onCheckboxClick(newCheckboxState);
    // console.log('isShortMoviesOn 2', isShortMoviesOn);

  }

  // console.log(' isShortMoviesOn', isShortMoviesOn);

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