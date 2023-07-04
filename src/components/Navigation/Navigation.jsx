import NavHome from "./NavHome/NavHome";
import {useLocation} from "react-router-dom";
import NavMovies from "./NavMovies/NavMovies";

function Navigation() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/'
        ?
        <NavHome/>
        :
        <NavMovies/>
      }
    </>
  )
}

export default Navigation