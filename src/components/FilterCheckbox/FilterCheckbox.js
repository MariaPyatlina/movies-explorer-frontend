import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const [isShortMoviesOn, setIsShortMoviesOn] = React.useState(false); // Состояние чекбокса по умолчани выключено

  const handleClick = (evt) => {
    if (isShortMoviesOn === false) {
      evt.target.setAttribute("checked", "checked");
      setIsShortMoviesOn(true);
      props.onShortFilmFilter({
        checkboxState: isShortMoviesOn,
      });
    } else {
      evt.target.removeAttribute("checked");
      setIsShortMoviesOn(false);
      props.onShortFilmFilter({
        checkboxState: isShortMoviesOn,
      });
    }
  }

  console.log(' isShortMoviesOn', isShortMoviesOn);

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