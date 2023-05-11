import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchBlock from '../SearchBlock/SearchBlock';
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <SearchBlock />
      <MoviesCardList savedMovies={props.savedMovies} onRemoveMovie={props.onRemoveMovie} />
    </>
  );
}

export default SavedMovies;