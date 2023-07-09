import NavAnon from "./NavAnon/NavAnon";
import {useLocation} from "react-router-dom";
import NavUser from "./NavUser/NavUser";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Navigation() {
  const location = useLocation();
  const user = useContext(CurrentUserContext);

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
        <NavUser theme={getTheme()}/>
      }
    </>
  )
}

export default Navigation