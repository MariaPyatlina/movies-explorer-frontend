import React from "react";
import './Movies';
import Header from '../Header/Header';
import SearchBlock from '../SearchBlock/SearchBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <>
            <SearchBlock />
            <MoviesCardList />
        </>
    )
}

export default Movies;