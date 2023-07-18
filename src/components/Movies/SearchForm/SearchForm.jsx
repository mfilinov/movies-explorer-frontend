import "./SearchForm.css"
import {useState} from "react";

function SearchForm({onSearch, search, handleChange, handleCheckboxChange}) {
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  async function handleCheckbox(e) {
    await handleCheckboxChange(e);
    e.target.form.requestSubmit();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.searchInput.value.trim()) {
      return setIsEmptyInput(true);
    }
    setIsEmptyInput(false);
    onSearch(search);
  }

  return (
    <div className="search page__search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__form-container">
          <div className="search__form-input-container">
            <div className="search__icon"/>
            <input
              type="text"
              className="search__form-input input-focus"
              placeholder="Фильм"
              name="searchInput"
              required
              onChange={handleChange}
              value={search.text}
            />
            <button className="search__form-button-submit button-hover"/>
          </div>
          <div className="search__checkbox-container button-hover">
            <label className="search__checkbox-label">
              <input
                className="search__checkbox"
                type="checkbox"
                name="searchCheckbox"
                id="searchCheckbox"
                onChange={handleCheckbox}
                checked={search.isShort}
              />
              <span className="search__checkbox-span input-focus"/>
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>
        {isEmptyInput &&
          <p className="search__form-warning">
            Нужно ввести ключевое слово
          </p>
        }
      </form>
    </div>
  )
}

export default SearchForm
