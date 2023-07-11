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
    <main className="page__auth">
      <section className="authentication authentication_size_l">
        <Authentication>Рады видеть!</Authentication>
        <AuthenticationForm type="login" handleSubmit={handleSubmit}/>
      </section>
    </main>
  )
}

export default Login