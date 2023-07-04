import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"

function MoviesCardList({movieCardList, isMoreButtonPresent}) {
  return (
    <section className="movies" aria-label="галерея">
      <ul className="movies__list list">
        {movieCardList.map(card => (<MoviesCard
            key={card['id']}
            movieCard={card}
          />)
        )}
      </ul>
      <div className="movies__more-button-container">
        {isMoreButtonPresent && (<button type="button" className="movies__more-button">Еще</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList