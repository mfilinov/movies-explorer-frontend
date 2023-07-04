import "./Login.css"
import Authentication from "../Authentication/Authentication";
import AuthenticationForm from "../Authentication/AuthenticationForm/AuthenticationForm";

function Login() {
  return (
    <main className="authentication">
      <Authentication>Рады видеть!</Authentication>
      <AuthenticationForm type="login"/>
    </main>
  )
}

export default Login