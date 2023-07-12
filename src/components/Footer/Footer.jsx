import {Link} from "react-router-dom";
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer footer_size_l">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h2>
      <div className="footer__basement">
        <p className="footer__copyright">&copy; 2023</p>
        <nav>
          <ul className="footer__links list">
            <li className="footer__links-element">
              <Link to="https://practicum.yandex.ru" className="footer__link link-hover"
                    target="_blank">Яндекс.Практикум</Link>
            </li>
            <li className="footer__links-element">
              <Link to="https://github.com/mfilinov" className="footer__link link-hover" target="_blank">Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer