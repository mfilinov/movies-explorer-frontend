import landingPromo from "../../../images/landing-promo.svg";
import "./Promo.css"

function Promo() {
  return(
    <section className="promo">
      <img src={landingPromo} alt="Лого проекта" className="promo__logo"/>
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  )
}

export default Promo