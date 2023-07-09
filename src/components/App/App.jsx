import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import {Route, Routes} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import {useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {WindowModeContext} from "../../contexts/WindowModeContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Виталий",
    email: "pochta@yandex.ru",
    isLoggedIn: false
  });

  const [device, setDevice] = useState("deskt");
  return (
    <div className="page">
      <WindowModeContext.Provider value={device}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser}/>}/>
            <Route path="/signin" element={<Login setCurrentUser={setCurrentUser}/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </CurrentUserContext.Provider>
      </WindowModeContext.Provider>
    </div>
  );
}

export default App;
