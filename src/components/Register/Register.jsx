import "./Register.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";

function Register() {
  return (
    <main className="authentication">
      <Authentication>Добро пожаловать!</Authentication>
      <AuthenticationForm type="register"/>
    </main>
  )
}

export default Register