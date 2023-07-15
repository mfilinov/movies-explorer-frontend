import "./Register.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";
import {useNavigate} from "react-router-dom";
import {mainApi} from "../../utils/MainApi";

function Register({setCurrentUser}) {
  const navigate = useNavigate();

  function onSubmit(name, email, password) {
    mainApi.register(name, email, password)
      .then((data) => {
        console.log(data)
        setCurrentUser((prev) => ({...prev, name:data.name, email:data.email}))
        navigate('/movies', {replace: true});
    })
      .catch((e) => console.log(e))
  }

  return (
    <main className="page__auth">
      <section className="authentication authentication_size_l">
        <Authentication>Добро пожаловать!</Authentication>
        <AuthenticationForm type="register" onSubmit={onSubmit}/>
      </section>
    </main>
  )
}

export default Register