import "./Authentication.css"
import Logo from "../Logo/Logo";

function Authentication({children}) {
  return (
    <>
      <Logo/>
      <h1 className="authentication__title">{children}</h1>
    </>
  )
}

export default Authentication