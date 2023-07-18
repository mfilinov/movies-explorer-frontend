import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import {visibleMovieCards} from "../../utils/config";
import {WindowModeContext} from "../../contexts/WindowModeContext";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {MOVIES_API_URL} from "../../utils/constants";
import useSearchForm from "../../hooks/useSearchForm";

/*Use cases:
1. Сохранить -> Переход между вкладками должен сохранять состояние saved
2. Сохранить -> поиск с другими результатами -> вернуться к первому поиску saved присутствует
3. Сохранить/Удалить должен менять состояние карточки и сохранять в фильтрах и сорсах
*/

function Movies() {
  const {search, setSearch, handleChange, handleCheckboxChange} = useSearchForm();
  const [moviesList, setMoviesList] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [hasNetError, setHasNetError] = useState(false);
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleMovieCards.desktop.initCount);
  const [isNoData, setIsNoData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const screenType = useContext(WindowModeContext);

  function updateStorages(movie) {
    setMoviesList(moviesList.map((obj) => (obj.id === movie.id) ? movie : obj))
    const localFilteredMoviesList = localStorage.getItem('filteredMoviesList');
    if (localFilteredMoviesList) {
      const newFilteredMoviesList = JSON.parse(localFilteredMoviesList).map((obj) => (obj.id === movie.id) ? movie : obj)
      setFilteredMovies(newFilteredMoviesList)
      localStorage.setItem('filteredMoviesList', JSON.stringify(newFilteredMoviesList))
    }
  }

  function saveMovie(movie) {
    setHasNetError(false)
    return mainApi.createSavedMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_API_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_API_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((res) => {
        movie.saved = true
        movie.movieUUID = res['_id']
        updateStorages(movie);
        return true
      })
      .catch(err => {
        setHasNetError(true)
        console.log(err)
        return false
      })
  }

  function deleteMovie(movie) {
    setHasNetError(false)
    return mainApi.deleteSavedMovie(movie.movieUUID)
      .then(() => {
        movie.saved = false
        updateStorages(movie);
        return true
      })
      .catch(err => {
        setHasNetError(true)
        console.log(err)
        return false
      })
  }

  async function handleSearchSubmit(searchData) {
    setHasNetError(false)
    if (moviesList.length === 0) {
      setIsLoading(true);
      try {
        const allMovies = await moviesApi.getAllMovies();
        const savedMovies = await mainApi.getSavedMovies();
        const result = enrichMoviesList(allMovies, savedMovies);
        filterMovies(searchData, result)
        setMoviesList(result);
      } catch (err) {
        setHasNetError(true)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      filterMovies(searchData, moviesList);
    }
  }

  function filterMovies(searchData, movies) {
    setVisibleCount(visibleMovieCards[screenType].initCount);
    setSearch(searchData);
    localStorage.setItem('searchData', JSON.stringify(searchData))
    const filteredMoviesList = movies.filter((movie) => {
      const match = movie.nameRU.includes(searchData.text)
      return searchData.isShort ? (movie.duration <= 40 && match) : match
    })
    if (filteredMoviesList.length === 0) {
      setIsNoData(true);
    } else {
      setIsNoData(false);
    }
    setFilteredMovies(filteredMoviesList)
    localStorage.setItem('filteredMoviesList', JSON.stringify(filteredMoviesList))
    const isMore = visibleMovieCards[screenType].initCount < filteredMoviesList.length
    setIsMoreButtonPresent(isMore);
  }

  function enrichMoviesList(sourceMovies, savedMovies) {
    return sourceMovies.map((movie) => {
      const result = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)
      return (result)
        ? {...movie, saved: true, movieUUID: result['_id']}
        : {...movie, saved: false}
    })
  }

  const handleShowMore = () => {
    const totalMovies = filteredMovies.length;
    const screenSizeConfig = visibleMovieCards[screenType];
    if (visibleCount + screenSizeConfig.moreCount < totalMovies) {
      setVisibleCount(visibleCount + screenSizeConfig.moreCount);
      setIsMoreButtonPresent(true);
    } else if (visibleCount < totalMovies) {
      setVisibleCount(visibleCount + screenSizeConfig.moreCount);
      setIsMoreButtonPresent(false);
    } else {
      setVisibleCount(totalMovies);
      setIsMoreButtonPresent(false);
    }
  };

  useEffect(() => {
    const localSearchData = localStorage.getItem('searchData');
    const localFilteredMoviesList = localStorage.getItem('filteredMoviesList');
    if (localSearchData && localFilteredMoviesList) {
      filterMovies(JSON.parse(localSearchData), JSON.parse(localFilteredMoviesList))
    }
    setVisibleCount(visibleMovieCards[screenType].initCount);
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
            onMore={handleShowMore}
            isMoreButtonPresent={isMoreButtonPresent}
            hasNetError={hasNetError}
            isNoData={isNoData}
            onSave={saveMovie}
            onDelete={deleteMovie}
            isLoading={isLoading}
          />}
      </main>
      <Footer/>
    </>
  )
}

export default Movies
