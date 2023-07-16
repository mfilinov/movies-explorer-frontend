import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"

function MoviesCardList({movieCardList, isMoreButtonPresent, onMore, hasNetError}) {

  return (
    <section className="movies movies_size_l" aria-label="галерея">
      <ul className="movies__list list">
        {movieCardList.map(card => (<MoviesCard
            key={card['id']}
            movieCard={card}
          />)
        )}
      </ul>
      {hasNetError &&
        <p className="movies__response movies__response_type_error">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен.
          Подождите немного и&nbsp;попробуйте ещё раз
        </p>}
      <div className="movies__more-button-container">
        {isMoreButtonPresent && (<button type="button" onClick={onMore} className="movies__more-button button-hover">Еще</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList
