import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchBlock from '../SearchBlock/SearchBlock';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies() {
    return (
        <>
            <Header />
            <SearchBlock />
            <MoviesCardList />
            <Footer />
        </>
    );
}

export default SavedMovies;