import "./Authentication.css"
import Logo from "../Logo/Logo";

function Authentication({children}) {
  return (
    <>
      <Logo/>
      <h2 className="authentication__title">{children}</h2>
    </>
  )
}

export default Authentication