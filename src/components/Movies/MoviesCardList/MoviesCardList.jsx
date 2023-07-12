import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"

function MoviesCardList({movieCardList, isMoreButtonPresent, onMore}) {

  return (
    <section className="movies movies_size_l" aria-label="галерея">
      <ul className="movies__list list">
        {movieCardList.map(card => (<MoviesCard
            key={card['id']}
            movieCard={card}
          />)
        )}
      </ul>
      <div className="movies__more-button-container">
        {isMoreButtonPresent && (<button type="button" onClick={onMore} className="movies__more-button button-hover">Еще</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList