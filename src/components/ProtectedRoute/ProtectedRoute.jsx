import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
  const user = useContext(CurrentUserContext);
  return user.isLoggedIn ? <Outlet/> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
