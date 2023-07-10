import "./MoviesCard.css"
import {useLocation} from "react-router-dom";

function MoviesCard({movieCard}) {
  const location = useLocation();

  function getButtonType() {
    if (location.pathname === '/saved-movies') {
      return "delete"
    }
    if (movieCard.saved) {
      return "saved"
    }
    return "generic"
  }

  const buttonType = getButtonType();

  return (
    <li className="movies-card">
      <article className="movies-card__container">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movieCard.nameRu}</h2>
          <p className="movies-card__duration">{movieCard.duration} минут</p>
        </div>
        <img src={movieCard.image} alt={movieCard.nameRU} className="card__image"/>
        <div className="movies-card__basement">{
          {
            delete: <button type="button" className="movies-card__button-delete button-hover"/>,
            saved: <button type="button" className="movies-card__save-button movies-card__save-button_saved">✓</button>,
            generic: <button type="button" className="movies-card__save-button">Сохранить</button>
          }[buttonType]
        }
        </div>
      </article>
    </li>
  )
}

export default MoviesCard