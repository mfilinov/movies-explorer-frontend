import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {movieCardList} from "../../utils/data";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useContext, useEffect, useState} from "react";
import {visibleMovieCards} from "../../utils/config";
import {WindowModeContext} from "../../contexts/WindowModeContext";
import {moviesApi} from "../../utils/MoviesApi";
import logo from "../Logo/Logo";

function Movies() {
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleMovieCards.desktop.initCount);
  const screenType = useContext(WindowModeContext);
  const [moviesList, setMoviesList] = useState(null)
  const totalMovies = movieCardList.length;

  const handleShowMore = () => {
    const currentCount = visibleCount;
    const screenSizeConfig = visibleMovieCards[screenType];
    const haveMoreCards = (currentCount + screenSizeConfig.moreCount) <= totalMovies
    if ((currentCount < totalMovies) && haveMoreCards) {
      setVisibleCount(currentCount + screenSizeConfig.moreCount);
    } else if (currentCount < totalMovies) {
      setVisibleCount(currentCount + screenSizeConfig.moreCount);
      setIsMoreButtonPresent(false);
    } else {
      setVisibleCount(totalMovies);
      setIsMoreButtonPresent(false);
    }
  };

  useEffect(() => {
    if (totalMovies > visibleMovieCards[screenType].initCount) {
      setIsMoreButtonPresent(true);
    }
    moviesApi.getAllMovies()
      .then((cards) => {
        setMoviesList(cards)
      })
      .catch(err => console.log(err))

    setVisibleCount(visibleMovieCards[screenType].initCount);
  }, [screenType])

  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm/>
        { moviesList &&
        <MoviesCardList
          movieCardList={moviesList.slice(0, visibleCount)}
          onMore={handleShowMore}
          isMoreButtonPresent={isMoreButtonPresent}/>
        }
      </main>
      <Footer/>
    </>
  )
}

export default Movies
