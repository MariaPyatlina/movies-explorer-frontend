import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchBlock from '../SearchBlock/SearchBlock';
import './SavedMovies.css';

function SavedMovies() {
    return (
        <>
            <SearchBlock />
            <MoviesCardList />
        </>
    );
}

export default SavedMovies;