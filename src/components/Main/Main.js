import React from "react";
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import NavTab from "../NavTab/NavTab";

function Main(props) {
    return (
        <main className="content">
            {/* <button onClick={props.onSearchMovies}>Do anything</button> */}
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />

        </main>
    );
}

export default Main;
