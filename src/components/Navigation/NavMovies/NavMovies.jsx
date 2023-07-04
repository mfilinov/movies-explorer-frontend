import "./NavMovies.css"
import {NavLink} from "react-router-dom";

function NavMovies() {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list list">
        <li>
          <NavLink
            to="/movies"
            className={({isActive}) => `header__nav-link${isActive ? ' header__nav-link_active' : ''}`}
          >Фильмы</NavLink>
        </li>
        <li className="header__nav-link-mid-container">
          <NavLink
            to="/saved-movies"
            className={({isActive}) => `header__nav-link${isActive ? ' header__nav-link_active' : ''}`}
          >Сохранённые фильмы</NavLink>
        </li>
        <li className="header__nav-account">
          <NavLink to="/profile" className="header__nav-account-link">Аккаунт</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavMovies