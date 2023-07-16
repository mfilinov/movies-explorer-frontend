import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import {visibleMovieCards} from "../../utils/config";
import {WindowModeContext} from "../../contexts/WindowModeContext";
import {moviesApi} from "../../utils/MoviesApi";

function Movies() {
  const [moviesList, setMoviesList] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [hasNetError, setHasNetError] = useState(false);
  const [search, setSearch] = useState({text: '', isShort: false});
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleMovieCards.desktop.initCount);
  const screenType = useContext(WindowModeContext);

  function filterMovies(searchData, movies) {
    setVisibleCount(visibleMovieCards[screenType].initCount);
    setSearch(searchData);
    localStorage.setItem('searchData', JSON.stringify(searchData))
    const filteredMoviesList = movies.filter((movie) => {
      const match = movie.nameRU.includes(searchData.text)
      return searchData.isShort ? (movie.duration <= 40 && match) : match
    })
    setFilteredMovies(filteredMoviesList)
    localStorage.setItem('filteredMoviesList', JSON.stringify(filteredMoviesList))
    const isMore = (visibleMovieCards[screenType].initCount + 1) <= filteredMoviesList.length
    setIsMoreButtonPresent(isMore);
  }

  function getCards(searchData) {
    if (moviesList.length === 0) {
      moviesApi.getAllMovies()
        .then((cards) => {
          setMoviesList(cards)
          filterMovies(searchData, cards)
          //TODO Preloader
        })
        .catch(err => {
          console.log(err)
          setHasNetError(true);
        })
    } else {
      filterMovies(searchData, moviesList)
    }
  }

  const handleShowMore = () => {
    const totalMovies = filteredMovies.length;
    const screenSizeConfig = visibleMovieCards[screenType];
    const haveMoreCards = (visibleCount + 1) <= totalMovies
    if ((visibleCount < totalMovies) && haveMoreCards) {
      console.log('if ((visibleCount < totalMovies) && haveMoreCards)')
      setVisibleCount(visibleCount + screenSizeConfig.moreCount);
    } else if (visibleCount < totalMovies) {
      console.log(' else if (visibleCount < totalMovies)')
      setVisibleCount(visibleCount + screenSizeConfig.moreCount);
      setIsMoreButtonPresent(false);
    } else {
      console.log('else')
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
    console.log('screenType useEffect', screenType)
    console.log('useEffect', visibleMovieCards[screenType].initCount)
    setVisibleCount(visibleMovieCards[screenType].initCount);
    // handleShowMore();
  }, [])

  console.log('screen', screenType);
  console.log('filteredMovies', filteredMovies.length);
  console.log('visibleCount', visibleCount);
  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm onSearch={getCards}/>
        {filteredMovies &&
          <MoviesCardList
            movieCardList={filteredMovies.slice(0, visibleCount)}
            onMore={handleShowMore}
            isMoreButtonPresent={isMoreButtonPresent}
            hasNetError={hasNetError}
          />}
      </main>
      <Footer/>
    </>
  )
}

export default Movies
