import NavAnon from "./NavAnon/NavAnon";
import {useLocation} from "react-router-dom";
import NavUser from "./NavUser/NavUser";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./Navigation.css"
import {WindowModeContext} from "../../contexts/WindowModeContext";
import NavBurger from "./NavBurger/NavBurger";

function Navigation() {
  const location = useLocation();
  const user = useContext(CurrentUserContext);
  const screenType = useContext(WindowModeContext);
  const [burgerActive, setBurgerActive] = useState(false);

  function handleBurger() {
    setBurgerActive((prev) => !prev)
  }

  function getType() {
    if (location.pathname === '/' && !user.isLoggedIn) {
      return "navAnon"
    } else if (screenType !== "desktop") {
      return "navUserBurger"
    } else {
      return "navUser"
    }
  }

  const navType = getType()

  return (
    <>{{
      navAnon: <NavAnon/>,
      navUser: <NavUser/>,
      navUserBurger: <NavBurger onClose={handleBurger} active={burgerActive}/>
    }[navType]}
    </>
  )
}

export default Navigation