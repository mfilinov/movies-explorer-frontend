import "./NavAnon.css"
import {Link} from "react-router-dom";

function NavAnon() {
  return(
    <nav className="nav-home nav-home__container">
      <ul className="nav-home__links list">
        <li>
          <Link to="/signup" className="nav-home__link link-hover">Регистрация</Link>
        </li>
        <li>
          <Link to="/signin" className="nav-home__link nav-home__link-login link-hover">Войти</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavAnon