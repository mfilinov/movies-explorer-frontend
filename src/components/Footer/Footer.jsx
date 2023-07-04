import {Link} from "react-router-dom";
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h2>
      <div className="footer__basement">
        <p className="footer__copyright">&copy;&nbsp;2023</p>
        <nav>
          <ul className="footer__links list">
            <li>
              <Link to="https://practicum.yandex.ru" className="footer__link link-opacity">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link to="https://github.com/mfilinov" className="footer__link link-opacity">Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer