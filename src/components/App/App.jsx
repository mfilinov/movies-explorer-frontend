import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import {Route, Routes, useNavigate} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {WindowModeContext} from "../../contexts/WindowModeContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {mainApi} from "../../utils/MainApi";
import useWindowSize from "../../hooks/useWindowSize";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLoggedIn: !!localStorage.getItem('jwt')
  });
  const [moviesList, setMoviesList] = useState([])
  const screenType = useWindowSize();
  const navigate = useNavigate();

  function handleLogin(email, password) {
    return mainApi.login(email, password)
      .then(({token}) => {
        localStorage.setItem('jwt', token)
        mainApi.setToken(token)
        return mainApi.getUser()
      })
      .then(({name, email}) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email, isLoggedIn: true}))
        navigate('/movies', {replace: true});
        return true
      })
  }

  function handleRegister(name, email, password) {
    return mainApi.register(name, email, password)
      .then(() => handleLogin(email, password))
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken(jwt);
      mainApi.getUser()
        .then(({name, email}) => {
          setCurrentUser((prev) => ({...prev, name: name, email: email, isLoggedIn: true}))
        })
        .catch((e) => console.log(e))
    }
  }, [])

  return (
    <div className="page">
      <WindowModeContext.Provider value={screenType}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>
            <Route path="/signup" element={<Register onRegister={handleRegister}/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path="/movies" element={<Movies moviesList={moviesList} setMoviesList={setMoviesList}/>}/>
              <Route path="/saved-movies" element={<SavedMovies/>}/>
              <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser}/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </CurrentUserContext.Provider>
      </WindowModeContext.Provider>
    </div>
  );
}

export default App;
