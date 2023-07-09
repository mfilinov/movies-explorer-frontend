import NavAnon from "./NavAnon/NavAnon";
import {useLocation} from "react-router-dom";
import NavUser from "./NavUser/NavUser";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./Navigation.css"

function Navigation() {
  const location = useLocation();
  const user = useContext(CurrentUserContext);
  const [burgerActive, setBurgerActive] = useState(false);

  function handleBurger() {
    setBurgerActive((prev) => !prev)
  }

  function getTheme() {
    if (location.pathname === '/') {
      return 'dark'
    }
    return 'light'
  }

  return (
    <>
      {location.pathname === '/' && !user.isLoggedIn
        ?
        <NavAnon/>
        :
        <NavUser theme={getTheme()} onClose={handleBurger} active={burgerActive}/>
      }
      <button type="button" className="header__burger-btn button-hover" onClick={handleBurger}/>
    </>
  )
}

export default Navigation