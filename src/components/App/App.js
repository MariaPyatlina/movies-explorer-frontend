import React from 'react';
import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// import Preloader from '../Preloader/Preloader';

import getMoviesCards from '../../utils/moviesApi';
import mainApi from '../../utils/mainApi';
import { handleError } from '../../utils/handleError';

import { filterMovieByQuery, filterMovieByDuration } from '../../utils/filterMovie';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

const { FILMS_COUNT_FOR_LARGE_SCREEN,
  FILMS_COUNT_FOR_MIDDLE_SCREEN,
  FILMS_COUNT_FOR_SMALL_SCREEN,
  ADD_MORE_FILMS_COUNT_FOR_LARGE_SCREEN,
  ADD_MORE_FILMS_COUNT_FOR_SMALL_SCREEN,
} = require('../../utils/constants');


function App() {
  const getInitialStateForSearch = (field, key) => {
    const initialSearchParams = JSON.parse(localStorage.getItem(field));

    if (initialSearchParams === null) { return null }
    else { return initialSearchParams[key] }
  }

  const [currentUser, setCurrentUser] = React.useState({});

  const [initialCountParameters, setInitialCountParameters] = React.useState({ showCount: 0, addMoreCount: 0 });

  const [movies, setMovies] = React.useState(JSON.parse(sessionStorage.getItem('movies')) || []); // Карточки загруженные с внешнего сервера
  const [fiteredMovies, setFileredMovies] = React.useState(getInitialStateForSearch('searchResult', 'filteredByDuration')); //Массив отфильтрованных фильмов на внешнем сервере
  const [filteredMoviesToShow, setFilteredMoviesToShow] = React.useState(null); // TODO заменить на параметр в зависимости от ширины

  const [savedMovies, setSavedMovies] = React.useState([]); // Фильмы. которые сохранены на внутреннем сервере
  const [filteredSavedMovies, setfilteredSavedMovies] = React.useState(getInitialStateForSearch('localSearchResult', 'filteredByDuration')); // Фильмы. которые отфильтровал на внутреннем сервере

  const [isLoading, setIsLoading] = React.useState(false); // Чтобы показывать прелоадер на время загрузки
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);
  const [isMoreButtonShown, setIsMoreButtonShown] = React.useState(false);

  // Для фильтрации и поиска
  const [moviesQuery, setMoviesQuery] = React.useState(getInitialStateForSearch('searchParams', 'searchQuery') || '');
  const [moviesCheckboxState, setMoviesCheckboxState] = React.useState(getInitialStateForSearch('searchParams', 'checkboxState') || false);

  const [savedMoviesQuery, setSavedMoviesQuery] = React.useState(getInitialStateForSearch('localSearchParams', 'savedMoviesQuery') || '');
  const [moviesCheckboxStateSavedMovies, setMoviesCheckboxStateSavedMovies] = React.useState(getInitialStateForSearch('localSearchParams', 'moviesCheckboxStateSavedMovies') || false);

  // Регистрация и авторизация
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Авторизован
  const [errorFromBack, setErrorFromBack] = React.useState('');

  const history = useHistory();
  const location = useLocation();

  //Получение данных о пользователе и сохраненных фильмах
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getAllSavedMovies()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser(userData);
          if (!savedMoviesQuery && !moviesCheckboxStateSavedMovies) {
            setfilteredSavedMovies(savedMoviesData.data)
          }
          setSavedMovies(savedMoviesData.data);
          sessionStorage.setItem('localSavedMovies', JSON.stringify(savedMoviesData.data));
        })
        .catch(err => {
          if (err.status !== 400) {
            setErrorFromBack(handleError(err));
          } else {
            setErrorFromBack(`Ошибка при загрузке данных с сервера`);
          }
          console.log(`Ошибка при загрузке данных с сервера ${err}`)
        });
    }
  }, [isLoggedIn, movies]);

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    setErrorFromBack('');
  }, [location]);


  React.useEffect(() => {

    const handleResizeCount = () => {
      const screenWidth = window.innerWidth;
      let size;
      if (screenWidth >= 1280) {
        size = { showCount: FILMS_COUNT_FOR_LARGE_SCREEN, addMoreCount: ADD_MORE_FILMS_COUNT_FOR_LARGE_SCREEN }
      }
      else if (screenWidth > 480) {
        size = { showCount: FILMS_COUNT_FOR_MIDDLE_SCREEN, addMoreCount: ADD_MORE_FILMS_COUNT_FOR_SMALL_SCREEN }
      }
      else { size = { showCount: FILMS_COUNT_FOR_SMALL_SCREEN, addMoreCount: ADD_MORE_FILMS_COUNT_FOR_SMALL_SCREEN } }

      setInitialCountParameters(size);

      return size;
    }

    const size = handleResizeCount();

    if (fiteredMovies !== null) {
      const moviesToDisplay = fiteredMovies.slice(0, size.showCount);

      setFilteredMoviesToShow(moviesToDisplay);

      if (moviesToDisplay.length !== fiteredMovies.length) {
        setIsMoreButtonShown(true);
      }
    }

    window.addEventListener('resize', handleResizeCount);

    return () => {
      window.removeEventListener('resize', handleResizeCount);
    }
  }, [])


  function handleRegister({ password, email, name }) {
    setIsLoading(true);
    mainApi.register({ password, email, name })
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          handleLogin({ password, email });
        }
      })
      .catch((err) => {
        if (err.status !== 400) {
          setErrorFromBack(handleError(err));
        } else {
          setErrorFromBack(`При регистрации пользователя произошла ошибка ${err.statusText}`);
        }
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleLogin({ password, email }) {
    setIsLoading(true);
    mainApi.authorize({ password, email })
      .then((data) => {
        if (!data.token) {
          return Promise.reject('Ошибка. Нет токена');
        }
        localStorage.setItem('jwt', data.token);
        mainApi.setToken(data.token);
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .then(() => {
        mainApi.getUserData()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            if (err.status !== 400) {
              setErrorFromBack(handleError(err));
            } else {
              setErrorFromBack(`Ошибка при загрузке данных с сервера`);
            }
            console.log(`Ошибка ${err}`)
          });
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        if (err.status !== 400) {
          setErrorFromBack(handleError(err));
        } else {
          setErrorFromBack(`Вы ввели неправильный логин или пароль.`);
        }
        console.log(`Ошибка ${err}`)
      })
      .finally(() => { setIsLoading(false) });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            mainApi.setToken(jwt);
            setIsLoggedIn(true);
            setCurrentUser(res);
            // history.push('/movies');
          }
        })
        .catch(err => {
          setErrorFromBack(err.statusText);
          console.log(`Ошибка ${err}`);
        });
    }
  }

  function handleExit() {
    // удаляем данные из локального хранилища
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchParams');
    localStorage.removeItem('localSearchParams');
    localStorage.removeItem('searchResult');
    localStorage.removeItem('localSearchResult');
    sessionStorage.removeItem('localSavedMovies');
    sessionStorage.removeItem('movies');

    //Обнуляем все стейт-переменные
    setMovies([]);
    setFileredMovies([]);
    setFilteredMoviesToShow([]);
    // setSavedMovies([]);
    setfilteredSavedMovies([]);
    setIsLoading(false);
    setIsMovieSaved(false);
    setIsMoreButtonShown(false);
    setMoviesQuery('');
    setMoviesCheckboxState(false);
    setSavedMoviesQuery('');
    setMoviesCheckboxStateSavedMovies(false);
    setInitialCountParameters({ showCount: 0, addMoreCount: 0 });
    setIsLoggedIn(false);
    setErrorFromBack(false);
    history.push('/');
    setCurrentUser({});

    //Редирект на главную страницу

  }


  function handleUpdateUserData({ email, name }) {
    setIsLoading(true);
    return mainApi.setUserData({ email, name })
      .then((data) => {
        setCurrentUser(data);
        setErrorFromBack('');
        alert("Изменения сохранены успешно");
      })
      .catch(err => {
        setIsLoading(false);
        setErrorFromBack(err);
        if (err.status !== 400) {
          setErrorFromBack(handleError(err));
        } else {
          setErrorFromBack(`При обновлении профиля произошла ошибка`);
        }
        console.log(`Ошибка ${err}`)
        return err
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSearchMovies = (searchQuery, moviesCheckboxState) => {
    // Проверяем, что лежит локально
    let localSavedMovies = JSON.parse(sessionStorage.getItem('movies'));
    setMoviesQuery(searchQuery);

    if (localSavedMovies === null || localSavedMovies === undefined || localSavedMovies === []) {
      setIsLoading(true);
      getMoviesCards() // Получаем все карточки с сервера
        .then((moviesData) => {
          sessionStorage.setItem('movies', JSON.stringify(moviesData));
          setMovies(moviesData);
          filterMoviesBySearchQueryAndCheckboxState(moviesData, searchQuery, moviesCheckboxState);
        })
        .catch(err => {
          setErrorFromBack(err.statusText);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    else {
      setMovies(localSavedMovies);
      // Фильтруем данные из SessionStorage
      filterMoviesBySearchQueryAndCheckboxState(localSavedMovies, searchQuery, moviesCheckboxState);
    }
  }

  // Поиск по всем фильмам
  const filterMoviesBySearchQueryAndCheckboxState = (moviesArray, searchQuery, checkboxState) => {
    localStorage.setItem('searchParams', JSON.stringify({ searchQuery, checkboxState }));
    const filteredByQuery = filterMovieByQuery(moviesArray, searchQuery);
    const filteredByDuration = filterMovieByDuration(filteredByQuery, checkboxState);

    localStorage.setItem('searchResult', JSON.stringify({ filteredByDuration }));

    setFileredMovies(filteredByDuration);

    const moviesToDisplayArr = filteredByDuration.slice(0, initialCountParameters.showCount);
    setFilteredMoviesToShow(moviesToDisplayArr);
    if (moviesToDisplayArr.length !== filteredByDuration.length) {
      setIsMoreButtonShown(true);
    }
  }

  // Поиск по сохраненным фильмам
  const handleLocalSearch = (savedMoviesQuery, moviesCheckboxStateSavedMovies) => {
    setSavedMoviesQuery(savedMoviesQuery);
    localStorage.setItem('localSearchParams', JSON.stringify({ savedMoviesQuery, moviesCheckboxStateSavedMovies }));
    const filteredByQuery = filterMovieByQuery(savedMovies, savedMoviesQuery);
    const filteredByDuration = filterMovieByDuration(filteredByQuery, moviesCheckboxStateSavedMovies);
    localStorage.setItem('localSearchResult', JSON.stringify({ filteredByDuration }));

    return setfilteredSavedMovies(filteredByDuration);
  }

  // Сохраняет фильм на сервере
  const handleAddMovieToSave = (movie) => {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setfilteredSavedMovies([newMovie, ...filteredSavedMovies]);
      })
      .catch(err => {
        setErrorFromBack(err.statusText);
        alert(`При сохранении фильма произошла ошибка ${err.statusText}`);
        console.log(err);
      })
  }

  // Удаляет фильм с сервера
  const handleRemovedMovie = (movie) => {
    const savedMovieForDelete = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);

    mainApi.removeMovie(savedMovieForDelete._id)
      .then(() => {
        setSavedMovies(savedMovies => savedMovies.filter(film => film._id !== savedMovieForDelete._id))
        setfilteredSavedMovies(filteredSavedMovies => filteredSavedMovies.filter(film => film._id !== savedMovieForDelete._id))
      })
      .catch(err => {
        setErrorFromBack(err.statusText);
        alert(`При удалении фильма произошла ошибка ${err.statusText}`);
        console.log(err);
      })
  }

  // Удаляет фильм из сохраненных
  const handleRemoveSavedMovie = (movie) => {
    mainApi.removeMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies => savedMovies.filter(film => film._id !== movie._id))
        setfilteredSavedMovies(filteredSavedMovies => filteredSavedMovies.filter(film => film._id !== movie._id))
      })
      .catch(err => {
        setErrorFromBack(err.statusText);
        alert(`При удалении фильма произошла ошибка ${err.statusText}`);
        console.log(err);
      })
  }

  // Запомнинает состояние чекбоксов
  const handleCheckboxClick = (currentChekboxState) => {
    setMoviesCheckboxState(currentChekboxState);
    if (filteredMoviesToShow) {
      filterMoviesBySearchQueryAndCheckboxState(movies, moviesQuery, currentChekboxState);
    }
  }

  const handleCheckboxClickSavedMovies = (currentChekboxState) => {
    setMoviesCheckboxStateSavedMovies(currentChekboxState);
  }

  // Пересчитывает массив для отрисовки
  const handleMoreClick = () => {
    const shownIndex = filteredMoviesToShow.length;
    const addedMoviesArray = fiteredMovies.slice(0, shownIndex + initialCountParameters.addMoreCount);

    if (addedMoviesArray.length === fiteredMovies.length) {
      setIsMoreButtonShown(false);
    }

    setFilteredMoviesToShow(addedMoviesArray);
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <div className="container">
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/movies">
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={Movies}
                movies={filteredMoviesToShow}
                savedMovies={savedMovies} // Массив сохраненных фильмов
                isMovieSaved={isMovieSaved}
                onAddMovie={handleAddMovieToSave}
                onRemoveMovie={handleRemovedMovie}
                moviesQuery={moviesQuery}
                onSearchSubmit={handleSearchMovies}
                moviesCheckboxState={moviesCheckboxState}
                onCheckboxClick={handleCheckboxClick}
                errorFromBack={errorFromBack}
                isLoading={isLoading}
                onMoreClick={handleMoreClick}
                isMoreButtonShown={isMoreButtonShown}
              />
            </Route>


            <Route path="/saved-movies">
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={SavedMovies}
                savedMovies={filteredSavedMovies}  // Отфильтрованые Сохраненные фильмы
                onRemoveSavedMovie={handleRemoveSavedMovie} // удаление из избранного
                moviesQuery={savedMoviesQuery} // поисковый запрос
                onSearchSubmit={handleLocalSearch} // действие по кнопке Сабмит
                moviesCheckboxState={moviesCheckboxStateSavedMovies} // состояние чекбокса
                onCheckboxClick={handleCheckboxClickSavedMovies} // клик по чекбоксу
                isLoading={isLoading}
              />
            </Route>

            <Route path="/profile">
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={Profile}
                onExit={handleExit}
                onProfileUpdate={handleUpdateUserData}
                errorFromBack={errorFromBack}
                isLoading={isLoading}
                checkToken={checkToken}
              />
            </Route>


            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                errorFromBack={errorFromBack}
                isLoading={isLoading}
              />
            </Route>

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                errorFromBack={errorFromBack}
                isLoading={isLoading}
              />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
