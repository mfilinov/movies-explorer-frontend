import "./MoviesCard.css"

function MoviesCard({movieCard}) {
  return (
    <li className="movies-card">
      <article className="movies-card__container">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movieCard.nameRu}</h2>
          <p className="movies-card__duration">{movieCard.duration} минут</p>
        </div>
        <img src={movieCard.image} alt={movieCard.nameRU} className="card__image"/>
        <div className="movies-card__basement">{
          movieCard.saved
            ? <button type="button" className="movies-card__save-button movies-card__save-button_saved">✓</button>
            : <button type="button" className="movies-card__save-button">Сохранить</button>
        }
        </div>
      </article>
    </li>
  )
}

export default MoviesCard