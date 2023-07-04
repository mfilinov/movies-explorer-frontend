import "./SearchForm.css"

function SearchForm() {
  return (
    <section className="search page__search">
      <form className="search__form">
        <div className="search__form-container">
          <div className="search__form-input-container">
            <div className="search__icon"/>
            <input type="text" className="search-form__input" placeholder="Фильм" name="searchInput"/>
            <div>
              <button className="search-form__button-submit"/>
            </div>
          </div>
          <div className="search__checkbox-container">
            <label className="search__checkbox-label">
              <input className="search__checkbox" type="checkbox" name="searchCheckbox" id="searchCheckbox"/>
              <span className="search__checkbox-span"/>
              <p className="search__checkbox-caption">Короткометражки</p>
            </label>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm