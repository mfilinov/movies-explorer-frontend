import "./Register.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/signin', {replace: true});
  }

  return (
    <main className="page__auth">
      <section className="authentication authentication_size_l">
        <Authentication>Добро пожаловать!</Authentication>
        <AuthenticationForm type="register" handleSubmit={handleSubmit}/>
      </section>
    </main>
  )
}

export default Register