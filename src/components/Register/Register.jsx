import "./Register.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";

function Register({onRegister}) {

  return (
    <main className="page__auth">
      <section className="authentication authentication_size_l">
        <Authentication>Добро пожаловать!</Authentication>
        <AuthenticationForm type="register" onSubmit={onRegister}/>
      </section>
    </main>
  )
}

export default Register
