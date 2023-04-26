import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {

    return (
        <>
            <label className="filter__lable" htmlFor="filter__checkbox">
                <input className="filter__checkbox" id="filter__checkbox" type="checkbox" />
                <span className="filter__switcher" htmlFor="filter__checkbox">Короткометражки</span>
            </label>
        </>
    );
}

export default FilterCheckbox;