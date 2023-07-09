import "./NavUser.css"
import {NavLink, useLocation} from "react-router-dom";
import {WindowModeContext} from "../../../contexts/WindowModeContext";
import {useContext} from "react";

function NavUser({theme, onClose, active}) {
  const device = useContext(WindowModeContext);

  return (
    <div className={`header__menu${active ? " header__menu_active" : ""}`}>
      <div className="header__blur" onClick={onClose}>
        <div className="header__menu-content" onClick={(e) => e.stopPropagation()}>
          <button
            type="button" className="header__close-button button-hover" onClick={onClose}
          />
          <nav className="header__nav">
            <ul className="header__nav-list list">
              {device !== "desktop" && <li className="header__nav-link-container">
                <NavLink
                  to="/"
                  className={({isActive}) => `header__nav-link header__nav-link_theme_${theme} link-hover${isActive ? ' header__nav-link_active' : ''}`}
                >Главная</NavLink>
              </li>}
              <li className="header__nav-link-container">
                <NavLink
                  to="/movies"
                  className={({isActive}) => `header__nav-link header__nav-link_theme_${theme} link-hover${isActive ? ' header__nav-link_active' : ''}`}
                >Фильмы</NavLink>
              </li>
              <li className="header__nav-link-mid-container">
                <NavLink
                  to="/saved-movies"
                  className={({isActive}) => `header__nav-link header__nav-link_theme_${theme} link-hover${isActive ? ' header__nav-link_active' : ''}`}
                >Сохранённые фильмы</NavLink>
              </li>
              <li className="header__nav-account">
                <NavLink to="/profile" className="header__nav-account-link link-hover">Аккаунт</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavUser