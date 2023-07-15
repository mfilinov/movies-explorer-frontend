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
  const srcImage = `https://api.nomoreparties.co${movieCard.image.url}`

  return (
    <li className="movies-card">
      <article className="movies-card__container">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movieCard.nameRU}</h2>
          <p className="movies-card__duration">{movieCard.duration} минут</p>
        </div>
        <img src={srcImage} alt={movieCard.nameRU} className="movies-card__image"/>
        <div className="movies-card__basement">{
          {
            delete: <button type="button" className="movies-card__button-delete button-hover"/>,
            saved: <button type="button" className="movies-card__save-button movies-card__save-button_saved button-hover">✓</button>,
            generic: <button type="button" className="movies-card__save-button button-hover">Сохранить</button>
          }[buttonType]
        }
        </div>
      </article>
    </li>
  )
}

export default MoviesCard
