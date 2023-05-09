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
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false); // Чтобы показывать прелоадер на время загрузки
  // const [searchQuery, setSearchQuery] = React.useState(''); // исходно запрос пустой
  const [shotMoviesOn, isShotMoviesOn] = React.useState(false);

  // Регистрация и авторизация
  const [signinState, setSigninState] = React.useState(false); // ??
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Авторизован

  const history = useHistory();

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleRegister({ password, email, name }) {
    setIsLoading(true);
    mainApi.register({ password, email, name })
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          handleLogin({ password, email })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(`Ошибка ${err}`)
      })
      .finally(() => { setIsLoading(false) });
  }


  function handleLogin({ password, email }) {
    setIsLoading(true); // прелоадер
    mainApi.authorize({ password, email })
      .then((data) => {
        if (!data.token) {
          return Promise.reject('Ошибка. Нет токена');
        }
        localStorage.setItem('jwt', data.token);
        mainApi.setToken(data.token);
        // setSigninState(true);
        setIsLoggedIn(true);
        history.push('/');
      })
      .then(() => {
        mainApi.getUserData()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => { console.log(`Ошибка ${err}`) });
      })
      .catch((err) => {
        // setSigninState(false);
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
            history.push('/');
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






  const handleCheckboxState = ({ checkboxState: isShortMoviesOn }) => {

    const checkboxParams = { checkboxState: isShortMoviesOn };
    isShotMoviesOn(checkboxParams.checkboxState);

    console.log('shotMoviesOn', shotMoviesOn);

    return shotMoviesOn;
  }





  const handleSearchMovies = ({ searchWord: searchQuery }) => { // сюда же должен прийти состояние чекбокса
    const searchParams = { searchWord: searchQuery };

    console.log('вызвали функцию handleSearchMovies', searchParams.searchWord);

    // Проверяем, что лежит локально
    let localSavedMovies = JSON.parse(sessionStorage.getItem('localMovies'));
    console.log('1. что лежит локально?', localSavedMovies);

    // если в storage нет объекта с таким ключом то пойдем на сервер
    if (localSavedMovies === null || localSavedMovies === undefined || localSavedMovies.length === 0) {
      console.log('2. Локально пусто. Пошел на сервер');
      setIsLoading(true);
      getMoviesCards() // Получаем все карточки с сервера
        .then((moviesData) => {
          sessionStorage.setItem('localMovies', JSON.stringify(moviesData));
          setMovies(moviesData);
          setMoviesLocal(moviesData);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false)
        }
        );
    }

    // Сохраняем локальные данные в стейт moviesLocal
    setMoviesLocal(JSON.parse(sessionStorage.getItem('localMovies')));
    // Фильтруем данные из SessionStorage
    filterMoviesBySearchQueryAndCheckboxState(moviesLocal, searchParams.searchWord, shotMoviesOn);
  }


  const filterMoviesBySearchQueryAndCheckboxState = (moviesArray, searchQuery, checkboxState) => {
    console.log('фильтрую. Начальные данные', moviesArray, searchQuery, checkboxState);

    let filteredByQuery = moviesArray.filter((film) => {
      return film.nameRU.includes(searchQuery)
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
    console.log('вызвали функцию handleAddMovie');
    // setIsLoading(true);
    mainApi.saveMovie(movie)
      // Надо как-то помечать, что фильм добавлен
      .catch(err => { console.log(err.message) })
    // .finally(() => setIsLoading(false));
  }

  // // Удаляет фильм с сервера
  // const handleRemoveMovie = (movie) => {
  //   console.log('вызвали функцию handleRemoveMovie');
  //   // setIsLoading(true);
  //   mainApi.removeMovie(movie.movieId)
  //     // Надо как-то помечать, что фильм удален
  //     .catch(err => { console.log(err.message) })
  //   // .finally(() => setIsLoading(false));
  // }

  // // Получает список сохраненных фильмов
  // const handleGetSavedMovies = () => {
  //   console.log('вызвали функцию handleGetSavedMovies');
  //   // setIsLoading(true);
  //   mainApi.getAllSavedMovies()
  //     .then((moviesData) => {
  //       console.log(moviesData);
  //       // setSavedMovies(moviesData);
  //       // Сохранили в localStorage
  //       localStorage.setItem('localSavedMovies', JSON.stringify(moviesData));
  //     })
  //     // Надо как-то помечать, что фильм удален
  //     .catch(err => { console.log(err.message) })
  //   // .finally(() => setIsLoading(false));
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
                  onSearchSubmit={handleSearchMovies}
                  onShortFilmFilter={handleCheckboxState}
                  onAddMovie={handleAddMovieToSave}
                // onRemoveMovie={props.onRemoveMovie}
                // onChange={handleChange}
                />
              </Route>

              <Route path="/saved-movies">
                <SavedMovies />
              </Route>

              <Route path="/profile">
                <Profile onExit={handleExit} />
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
