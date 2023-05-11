import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchBlock from '../SearchBlock/SearchBlock';
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <SearchBlock
        moviesQuery={props.moviesQuery}
        // onChange={props.onChange}
        onSearchSubmit={props.onSearchSubmit}
        moviesCheckboxState={props.moviesCheckboxState}
        onCheckboxClick={props.onCheckboxClick}
      />
      <MoviesCardList
        savedMovies={props.savedMovies}
        onRemoveSavedMovie={props.onRemoveSavedMovie}
      />
    </>
  );
}

export default SavedMovies;