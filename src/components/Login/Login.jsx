import "./Login.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";

function Login({onLogin}) {

  return (
    <main className="page__auth">
      <section className="authentication authentication_size_l">
        <Authentication>Рады видеть!</Authentication>
        <AuthenticationForm type="login" onSubmit={onLogin}/>
      </section>
    </main>
  )
}

export default Login
