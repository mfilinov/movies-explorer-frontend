import "./Portfolio.css"
import {portfolioData} from "../../../utils/data";
import {Link} from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list list">
        {portfolioData.map((item, index) => {
          return <li key={index} className="portfolio__list-element">
            <Link className="portfolio__link link-opacity" to={item.url} target="_blank">
              {item.title}
              <span className="portfolio__icon">↗</span>
            </Link>
          </li>
        })}
      </ul>
    </section>
  )
}

export default Portfolio