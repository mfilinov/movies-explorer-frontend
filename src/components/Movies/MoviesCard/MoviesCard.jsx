import "./MoviesCard.css"
import {useLocation} from "react-router-dom";
import {MOVIES_API_URL} from "../../../utils/constants";
import {useState} from "react";

function MoviesCard({movieCard, onSave, onDelete}) {
  const location = useLocation();
  const [type, setType] = useState(getButtonType());
  const srcImage = type === "delete" ? movieCard.image : `${MOVIES_API_URL}${movieCard.image.url}`;

  async function handleSave() {
    await onSave(movieCard) && setType('saved');
  }

  async function handleDelete() {
    await onDelete(movieCard) && setType('generic');
  }

  function getButtonType() {
    if (location.pathname === '/saved-movies') {
      return "delete"
    }
    if (movieCard.saved) {
      return "saved"
    }
    return "generic"
  }

  function openLinkInNewTab() {
    window.open(movieCard.trailerLink, "_blank", "noreferrer");
  }

  return (
    <li className="movies-card">
      <article className="movies-card__container">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movieCard.nameRU}</h2>
          <p className="movies-card__duration">{movieCard.duration} минут</p>
        </div>
        <img src={srcImage} alt={movieCard.nameRU} className="movies-card__image" onClick={openLinkInNewTab}/>
        <div className="movies-card__basement">{
          {
            delete: <button type="button" className="movies-card__button-delete button-hover" onClick={handleDelete}/>,
            saved: <button
              type="button"
              className="movies-card__save-button movies-card__save-button_saved button-hover"
              onClick={handleDelete}
            >✓</button>,
            generic: <button type="button" className="movies-card__save-button button-hover" onClick={handleSave}>
              Сохранить</button>
          }[type]
        }
        </div>
      </article>
    </li>
  )
}

export default MoviesCard
