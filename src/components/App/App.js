import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';


import getMoviesCards from '../../utils/moviesApi';
import mainApi from '../../utils/mainApi';
import { filterMovieByQuery, filterMovieByDuration } from '../../utils/filterMovie';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';


function App() {

  const getInitialStateForSearch = (field, key) => {
    const initialSearchParams = JSON.parse(localStorage.getItem(field));

    if (initialSearchParams === null) { return '' }
    else { return initialSearchParams[key] }
  }


  const [currentUser, setCurrentUser] = React.useState({});


  const [movies, setMovies] = React.useState([]); // Карточки загруженные с сервера
  const [moviesLocal, setMoviesLocal] = React.useState([]); // Сохраненные карточеки в seesionStorage
  const [fiteredMovies, setFileredMovies] = React.useState([]); //Массив отфильтрованных фильмов
  const [savedMovies, setSavedMovies] = React.useState([]); // Фильмы. которые сохранил себе пользователь
  const [filteredSavedMovies, setfilteredSavedMovies] = React.useState([]); // Фильмы. которые сохранил себе пользователь

  const [isLoading, setIsLoading] = React.useState(false); // Чтобы показывать прелоадер на время загрузки
  const [shotMoviesOn, isShotMoviesOn] = React.useState(false);  //
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  // Для фильтрации и поиска
  const [moviesQuery, setMoviesQuery] = React.useState(getInitialStateForSearch('searchParams', 'searchQuery'));
  const [savedMoviesQuery, setSavedMoviesQuery] = React.useState(getInitialStateForSearch('localSearchParams', 'savedMoviesQuery'));
  const [moviesCheckboxState, setMoviesCheckboxState] = React.useState(getInitialStateForSearch('searchParams', 'checkboxState'));
  const [moviesCheckboxStateSavedMovies, setMoviesCheckboxStateSavedMovies] = React.useState(getInitialStateForSearch('localSearchParams', 'moviesCheckboxStateSavedMovies'));

  // Регистрация и авторизация
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Авторизован
  const [errorFromBack, setErrorFromBack] = React.useState('');

  const history = useHistory();





  //Получение данных о пользователе и сохраненных фильмах
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getAllSavedMovies()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(savedMoviesData.data);
          sessionStorage.setItem('localSavedMovies', JSON.stringify(savedMoviesData.data));
        })
        .catch(err => {
          console.log(`Ошибка при загрузке данных с сервера ${err}`)
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

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
        setErrorFromBack(err.message);
        console.log(`Ошибку поймал на 78й в app ${err}`,)
        console.log(`Ошибка ${err}`)
      })
      .finally(() => {
        console.log('errorFromBack в ошиюке', errorFromBack);
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
          .catch((err) => { console.log(`Ошибка ${err}`) });
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setIsLoading(false);
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
            history.push('/movies');
          }
        })
        .catch(err => {
          console.log(`Ошибка ${err}`)
        });
    }
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/');
    setCurrentUser({});
  }

  function handleUpdateUserData({ email, name }) {
    setIsLoading(true);
    mainApi.setUserData({ email, name })
      .then((data) => {
        console.log('ata', data);
        setCurrentUser(data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(`Ошибка ${err}`)
      })
      .finally(() => setIsLoading(false))
  }

  const handleSearchMovies = (searchQuery, moviesCheckboxState) => { // сюда же должен прийти состояние чекбокса
    // Проверяем, что лежит локально
    let localSavedMovies = JSON.parse(sessionStorage.getItem('movies'));
    const initialSearchParams = JSON.parse(localStorage.getItem('searchParams'));
    console.log('initialSearchParams', initialSearchParams);
    const initialLocalSearchParams = JSON.parse(localStorage.getItem('localSearchParams'));
    console.log('initialLocalSearchParams', initialLocalSearchParams);

    if (localSavedMovies === null || localSavedMovies === undefined || localSavedMovies === []) {
      console.log('2. Локально пусто. Пошел на сервер');
      setIsLoading(true);
      getMoviesCards() // Получаем все карточки с сервера
        .then((moviesData) => {
          sessionStorage.setItem('movies', JSON.stringify(moviesData));
          setMovies(moviesData);
          // setMoviesLocal(moviesData);
          filterMoviesBySearchQueryAndCheckboxState(moviesData, searchQuery, moviesCheckboxState);
        })
        .catch(err => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false)
        }
        );

    }
    else {
      setMovies(localSavedMovies);
      // Фильтруем данные из SessionStorage
      filterMoviesBySearchQueryAndCheckboxState(localSavedMovies, searchQuery, moviesCheckboxState);
    }
  }

  // Поиск по всем фильмам
  const filterMoviesBySearchQueryAndCheckboxState = (moviesArray, searchQuery, checkboxState) => {
    console.log('фильтрую. Начальные данные', moviesArray, searchQuery, checkboxState);

    localStorage.setItem('searchParams', JSON.stringify({ searchQuery, checkboxState }));
    const filteredByQuery = filterMovieByQuery(moviesArray, searchQuery);
    const filteredByDuration = filterMovieByDuration(filteredByQuery, moviesCheckboxStateSavedMovies);

    return setfilteredSavedMovies(filteredByDuration);
  }

  //Поиск по сохраненным фильмам
  const handleLocalSearch = (savedMoviesQuery, moviesCheckboxStateSavedMovies) => {
    const currentSavedMovie = JSON.parse(sessionStorage.getItem('localSavedMovies'));
    console.log('фильтрую. Сохраненные данные данные', currentSavedMovie, savedMoviesQuery, moviesCheckboxStateSavedMovies);

    localStorage.setItem('localSearchParams', JSON.stringify({ savedMoviesQuery, moviesCheckboxStateSavedMovies }));
    const filteredByQuery = filterMovieByQuery(currentSavedMovie, savedMoviesQuery);
    const filteredByDuration = filterMovieByDuration(filteredByQuery, moviesCheckboxStateSavedMovies);

    return setfilteredSavedMovies(filteredByDuration);
  }

  // Сохраняет фильм на сервере
  const handleAddMovieToSave = (movie) => {
    setIsLoading(true);
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => setIsLoading(false));
  }

  // Удаляет фильм с сервера
  const handleRemovedMovie = (movie) => {
    const savedMovieForDelete = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);

    setIsLoading(true);
    mainApi.removeMovie(savedMovieForDelete._id)
      .then(() => {
        setSavedMovies(savedMovies => savedMovies.filter(film => film._id !== savedMovieForDelete._id))
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => setIsLoading(false));
  }

  // Удаляет фильм из сохраненных
  const handleRemoveSavedMovie = (movie) => {
    console.log('вызвали функцию handleRemoveMovie', movie._id);
    setIsLoading(true);
    mainApi.removeMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies => savedMovies.filter(film => film._id !== movie._id))
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => setIsLoading(false));
  }


  const handleCheckboxClick = (currentChekboxState) => {
    setMoviesCheckboxState(currentChekboxState);
  }

  const handleCheckboxClickSavedMovies = (currentChekboxState) => {
    setMoviesCheckboxStateSavedMovies(currentChekboxState);
  }


  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <div className="container">
          <Header isLoggedIn={isLoggedIn} />
          {isLoading ? <Preloader /> :
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <Route path="/movies">
                <Movies
                  movies={fiteredMovies}
                  savedMovies={savedMovies} // Массив сохраненных фильмов
                  isMovieSaved={isMovieSaved}
                  // onSearchSubmit={handleSearchMovies}
                  // onShortFilmFilter={handleCheckboxState}
                  onAddMovie={handleAddMovieToSave}
                  onRemoveMovie={handleRemovedMovie}
                  // onChange={handleChange}
                  moviesQuery={moviesQuery}
                  onSearchSubmit={handleSearchMovies}
                  moviesCheckboxState={moviesCheckboxState}
                  onCheckboxClick={handleCheckboxClick}
                />
              </Route>

              <Route path="/saved-movies">
                <SavedMovies
                  savedMovies={filteredSavedMovies}  // Отфильтрованые Сохраненные фильмы
                  onRemoveSavedMovie={handleRemoveSavedMovie} // удаление из избранного

                  moviesQuery={savedMoviesQuery} // поисковый запрос
                  onSearchSubmit={handleLocalSearch} // действие по кнопке Сабмит
                  moviesCheckboxState={moviesCheckboxStateSavedMovies} // состояние чекбокса
                  onCheckboxClick={handleCheckboxClickSavedMovies} // клик по чекбоксу
                />
              </Route>

              <Route path="/profile">
                <Profile onExit={handleExit} onProfileUpdate={handleUpdateUserData} errorFromBack={errorFromBack} />
              </Route>

              <Route path="/signin">
                <Login onLogin={handleLogin} errorFromBack={errorFromBack} />
              </Route>

              <Route path="/signup">
                <Register onRegister={handleRegister} errorFromBack={errorFromBack} />
              </Route>

              <Route path="/notfound">
                <NotFoundPage />
              </Route>

              <Route path="*">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route>
            </Switch>
          }

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
