import "./SavedMovies.css"
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {useContext, useEffect, useState} from "react";
import {WindowModeContext} from "../../contexts/WindowModeContext";
import {visibleMovieCards} from "../../utils/config";
import useSearchForm from "../../hooks/useSearchForm";
import {mainApi} from "../../utils/MainApi";
import {SHORT_MOVIE_DURATION} from "../../utils/constants";

function SavedMovies() {
  const {search, setSearch, handleChange, handleCheckboxChange} = useSearchForm();
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNetError, setHasNetError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleMovieCards.desktop.initCount);
  const [isNoData, setIsNoData] = useState(false);
  const screenType = useContext(WindowModeContext);

  function filterMovies(movies, search) {
    return movies.filter((movie) => {
      const match = movie.nameRU.toLowerCase().includes(search.text.toLowerCase())
      return search.isShort ? (movie.duration <= SHORT_MOVIE_DURATION && match) : match
    })
  }

  function handleSearchSubmit(searchData) {
    setVisibleCount(visibleMovieCards[screenType].initCount);
    setSearch(searchData);
    const filteredMoviesList = filterMovies(moviesList, searchData);
    if (filteredMoviesList.length === 0) {
      setIsNoData(true);
    } else {
      setIsNoData(false);
    }
    setFilteredMovies(filteredMoviesList);
  }

  function updateStorages(movie) {
    const updatedMoviesList = moviesList.filter((obj) => (obj['_id'] !== movie['_id']))
    setMoviesList(updatedMoviesList);
    if (search.text !== '') {
      const newFilteredMoviesList = filterMovies(updatedMoviesList, search);
      if (newFilteredMoviesList.length === 0) {
        setFilteredMovies([])
        setIsNoData(true)
      } else {
        setFilteredMovies(newFilteredMoviesList)
      }
    } else {
      setFilteredMovies(updatedMoviesList);
    }
    // Смена состояния saved у удаляемого фильма если он находится в localstorage
    const localFilteredMoviesList = localStorage.getItem('filteredMoviesList');
    if (localFilteredMoviesList) {
      const newFilteredMoviesList = JSON.parse(localFilteredMoviesList)
        .map((obj) => {
          if (obj.id === movie.movieId) {
            obj.saved = false
            return obj
          }
          return obj
        })
      localStorage.setItem('filteredMoviesList', JSON.stringify(newFilteredMoviesList))
    }
  }

  function deleteMovie(movie) {
    setHasNetError(false)
    mainApi.deleteSavedMovie(movie['_id'])
      .then(() => updateStorages(movie))
      .catch(err => {
        setHasNetError(true)
        console.log(err)
      })
  }

  useEffect(() => {
    setVisibleCount(visibleMovieCards[screenType].initCount);
    if (moviesList.length === 0) {
      setIsLoading(true);
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          setMoviesList(savedMovies);
          setFilteredMovies(savedMovies);
        })
        .catch(err => {
          setHasNetError(true)
          console.log(err)
        })
        .finally(() => setIsLoading(false));
    }

  }, [screenType])

  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm
          onSearch={handleSearchSubmit}
          search={search}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}/>
        {filteredMovies &&
          <MoviesCardList
            movieCardList={filteredMovies.slice(0, visibleCount)}
            isMoreButtonPresent={false}
            isNoData={isNoData}
            hasNetError={hasNetError}
            onDelete={deleteMovie}
            isLoading={isLoading}
          />}
      </main>
      <Footer/>
    </>
  )
}

export default SavedMovies