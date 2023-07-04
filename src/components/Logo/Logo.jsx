import {Link} from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";

function Logo() {
  return(
    <Link to="/" className="logo link-opacity">
      <img src={headerLogo} alt="Лого" className="logo__img"/>
    </Link>
  )
}

export default Logo