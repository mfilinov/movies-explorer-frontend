import "./Login.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";
import {useNavigate} from "react-router-dom";

function Login({setCurrentUser}) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentUser((prev) => ({...prev, isLoggedIn: true}));
    navigate('/movies', {replace: true});
  }

  return (
    <main className="authentication authentication_size_l">
      <Authentication>Рады видеть!</Authentication>
      <AuthenticationForm type="login" handleSubmit={handleSubmit}/>
    </main>
  )
}

export default Login