import {Link} from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import "./Logo.css"

function Logo() {
  return(
    <Link to="/" className="logo logo_type_flex link-hover">
      <img src={headerLogo} alt="Лого" className="logo__img"/>
    </Link>
  )
}

export default Logo