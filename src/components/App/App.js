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

import CurrentUserContext from '../../contexts/CurrentUserContext.js';


function App() {
  const [currentUser, setCurrentUser] = React.useState({});


  const [movies, setMovies] = React.useState([]); // Карточки загруженные с сервера
  const [moviesLocal, setMoviesLocal] = React.useState([]); // Сохраненные карточеки в seesionStorage
  const [fiteredMovies, setFileredMovies] = React.useState([]); //Массив отфильтрованных фильмов
  const [savedMovies, setSavedMovies] = React.useState([]); // Фильмы. которые сохранил себе пользователь

  const [isLoading, setIsLoading] = React.useState(false); // Чтобы показывать прелоадер на время загрузки
  const [shotMoviesOn, isShotMoviesOn] = React.useState(false);  //
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  // Для фильтрации и поиска
  const [moviesQuery, setMoviesQuery] = React.useState('');
  const [moviesCheckboxState, setMoviesCheckboxState] = React.useState(false);

  // Регистрация и авторизация
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Авторизован

  const history = useHistory();




  //Получение данных о пользователе и сохраненных фильмах
  React.useEffect(() => {
    console.log('Сработал юз эффект получения данных');
    if (isLoggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getAllSavedMovies()])
        .then(([userData, savedMoviesData]) => {
          console.log('userData', userData);
          console.log('savedMoviesData', savedMoviesData.data);
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
        setIsLoading(false);
        console.log(`Ошибка ${err}`)
      })
      .finally(() => { setIsLoading(false) });
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
    console.log('exit done');
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


  // const handleCheckboxState = ({ checkboxState: isShortMoviesOn }) => {

  //   const checkboxParams = { checkboxState: isShortMoviesOn };
  //   isShotMoviesOn(checkboxParams.checkboxState);

  //   console.log('shotMoviesOn', shotMoviesOn);

  //   return shotMoviesOn;
  // }

  console.log('moviesCheckboxState in App', moviesCheckboxState);
  const handleSearchMovies = (searchQuery, moviesCheckboxState) => { // сюда же должен прийти состояние чекбокса
    // const searchParams = { searchWord: searchQuery };


    console.log('вызвали функцию handleSearchMovies moviesCheckboxState', moviesCheckboxState);


    // Проверяем, что лежит локально
    let localSavedMovies = JSON.parse(sessionStorage.getItem('movies'));
    console.log('1. что лежит локально?', localSavedMovies);

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


  const filterMoviesBySearchQueryAndCheckboxState = (moviesArray, searchQuery, checkboxState) => {
    console.log('фильтрую. Начальные данные', moviesArray, searchQuery, checkboxState);

    let filteredByQuery = moviesArray.filter((film) => {
      return (film.nameRU.includes(searchQuery) || film.nameEN.includes(searchQuery))
    })

    if (checkboxState) {
      let filteredMoviesByDuration = filteredByQuery.filter((film) => {
        return film.duration <= 40;
      })

      return setFileredMovies(filteredMoviesByDuration);
    }
    else {
      return setFileredMovies(filteredByQuery);
    }
  }



  // const handleShortFilmFilter = ({ checkboxState: isShortMoviesOn }, array) => {
  //   console.log('вызвали функцию handleShortFilmsCheckbox', { checkboxState: isShortMoviesOn });
  //   const obj = { checkboxState: isShortMoviesOn };
  //   const checkboxState = obj.checkboxState;
  //   // const localSavedMovies = JSON.parse(sessionStorage.getItem('localMovies'));
  //   if (checkboxState) {
  //     let filteredMoviesByDuration = array.filter((film) => {
  //       return film.duration <= 40;
  //     })

  //     console.log('фильтрация по длительности', filteredMoviesByDuration);
  //   }

  // }


  // // Сохраняет фильм на сервере
  const handleAddMovieToSave = (movie) => {
    console.log('вызвали функцию handleAddMovie', movie.nameRu);
    setIsLoading(true);
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        console.log('добавили неовую карточку в массив', newMovie);
        setSavedMovies([newMovie, ...savedMovies]);
        console.log('массив сохраненных =', savedMovies);
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => setIsLoading(false));
  }

  // Удаляет фильм с сервера
  const handleRemovedMovie = (movie) => {
    console.log('вызвали функцию handleRemoveMovie', movie.id); // id = 2

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


  // Получает список сохраненных фильмов
  // const handleGetSavedMovies = () => {
  //   console.log('вызвали функцию handleGetSavedMovies');
  //   setIsLoading(true);
  //   mainApi.getAllSavedMovies()
  //     .then((moviesData) => {
  //       console.log(moviesData);
  //       // setSavedMovies(moviesData);
  //       // Сохранили в localStorage
  //       localStorage.setItem('localSavedMovies', JSON.stringify(moviesData));
  //     })
  //     // Надо как-то помечать, что фильм удален
  //     .catch(err => {
  //       setIsLoading(false)
  //       console.log(err.message)
  //     })
  //     .finally(() => setIsLoading(false));
  // }

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
                  onSearchSubmit={handleSearchMovies}
                  // onShortFilmFilter={handleCheckboxState}
                  onAddMovie={handleAddMovieToSave}
                  onRemoveMovie={handleRemovedMovie}
                  // onChange={handleChange}
                  moviesQuery={moviesQuery}
                  moviesCheckboxState={moviesCheckboxState}
                  onCheckboxClick={handleCheckboxClick}
                />
              </Route>

              <Route path="/saved-movies">
                <SavedMovies
                  savedMovies={savedMovies}
                  onRemoveSavedMovie={handleRemoveSavedMovie}
                />
              </Route>

              <Route path="/profile">
                <Profile onExit={handleExit} onProfileUpdate={handleUpdateUserData} />
              </Route>

              <Route path="/signin">
                <Login onLogin={handleLogin} />
              </Route>

              <Route path="/signup">
                <Register onRegister={handleRegister} />
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
