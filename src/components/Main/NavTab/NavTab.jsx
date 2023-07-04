import {HashLink} from 'react-router-hash-link';
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links list">
        <li><HashLink smooth to="/#about-project" className="nav-tab__link link-opacity">О проекте</HashLink></li>
        <li><HashLink smooth to="/#techs" className="nav-tab__link link-opacity">Технологии</HashLink></li>
        <li><HashLink smooth to="/#about-me" className="nav-tab__link link-opacity">Студент</HashLink></li>
      </ul>
    </nav>
  )
}

export default NavTab