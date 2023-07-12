import "./Header.css"
import Navigation from "../Navigation/Navigation";
import {useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";

function Header() {
  const location = useLocation();
  return (
    <header className={`header ${location.pathname === '/' ? 'header_theme_promo' : 'header_theme_main'}`}>
      <div className="header__container">
        <Logo/>
        <Navigation/>
      </div>
    </header>
  )
}

export default Header
