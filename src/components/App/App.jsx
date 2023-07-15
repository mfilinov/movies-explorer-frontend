import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import {Route, Routes} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {WindowModeContext, deviceWidth} from "../../contexts/WindowModeContext";
import {debounce} from "../../utils/utils";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
    isLoggedIn: false
  });
  const [screenType, setScreenType] = useState("desktop");


  useEffect(() => {
    const debounceTime = 500;
    const handleScreenResize = () => {
      const currenWidth = window.innerWidth
      if (currenWidth < deviceWidth.tablet) {
        setScreenType('mobile');
      } else if (currenWidth === deviceWidth.tablet) {
        setScreenType('tablet');
      } else if (currenWidth > deviceWidth.tablet) {
        setScreenType('desktop');
      }
    }

    handleScreenResize();
    window.addEventListener('resize', debounce(handleScreenResize, debounceTime));
    return () => {
      window.removeEventListener('resize', debounce(handleScreenResize, debounceTime));
    };
  }, [])

  return (
    <div className="page">
      <WindowModeContext.Provider value={screenType}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/signin" element={<Login setCurrentUser={setCurrentUser}/>}/>
            <Route path="/signup" element={<Register setCurrentUser={setCurrentUser}/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path="/movies" element={<Movies/>}/>
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
