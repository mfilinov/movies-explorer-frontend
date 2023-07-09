import {HashLink} from 'react-router-hash-link';
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab nav-tab_size_l">
      <ul className="nav-tab__links list">
        <li><HashLink smooth to="/#about-project" className="nav-tab__link link-hover">О проекте</HashLink></li>
        <li><HashLink smooth to="/#techs" className="nav-tab__link link-hover">Технологии</HashLink></li>
        <li><HashLink smooth to="/#about-me" className="nav-tab__link link-hover">Студент</HashLink></li>
      </ul>
    </nav>
  )
}

export default NavTab