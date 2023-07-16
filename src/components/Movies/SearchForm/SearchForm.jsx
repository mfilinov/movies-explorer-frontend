import "./SearchForm.css"
import {useState} from "react";

function SearchForm({onSearch}) {
  const [searchData, setSearchData] = useState({text: '', isShort: false});

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchData);
  }

  function handleChange(e) {
    setSearchData((prev) => ({...prev, text: e.target.value}))
  }

  function handleCheckboxChange(e) {
    setSearchData((prev) => ({...prev, isShort: e.target.checked}))
  }

  return (
    <div className="search page__search">
      <form className="search__form" onSubmit={handleSubmit}>
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
                onChange={handleCheckboxChange}
              />
              <span className="search__checkbox-span input-focus"/>
              <span className="search__checkbox-caption">Короткометражки</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
