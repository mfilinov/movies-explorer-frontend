import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css"
import Preloader from "../../Preloader/Preloader";

function MoviesCardList(
  {
    movieCardList,
    isMoreButtonPresent,
    onMore,
    hasNetError,
    isNoData,
    onSave,
    onDelete,
    isLoading
  }) {

  return (
    <section className="movies movies_size_l" aria-label="галерея">
      {hasNetError &&
        <p className="movies__response movies__response_type_error">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен.
          Подождите немного и&nbsp;попробуйте ещё раз
        </p>
      }
      {isLoading
        ? <Preloader/>
        :
        <ul className="movies__list list">
          {movieCardList.map(card => (<MoviesCard
              key={card['id'] || card['movieId']}
              movieCard={card}
              onSave={onSave}
              onDelete={onDelete}
            />)
          )}
        </ul>}
      {isNoData &&
        <p className="movies__response movies__response_type_success">
          Ничего не&nbsp;найдено
        </p>
      }
      <div className="movies__more-button-container">
        {isMoreButtonPresent && (
          <button type="button" onClick={onMore} className="movies__more-button button-hover">Еще</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList
