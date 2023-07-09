import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {movieCardList} from "../../utils/data";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import {visibleMovieCards} from "../../utils/config";

function Movies() {
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleMovieCards.desktop.initCount);
  const [screenSize, setScreenSize] = useState('desktop');
  const totalMovies = movieCardList.length;

  const handleShowMore = () => {
    const currentCount = visibleCount;
    const screenSizeConfig = visibleMovieCards[screenSize];
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

  const test = () => {
    const currenWidth = window.innerWidth
    if (currenWidth < visibleMovieCards.mobile.screenWidth) {
      setVisibleCount(visibleMovieCards.mobile.initCount);
      setScreenSize('mobile');
    } else if (currenWidth <= visibleMovieCards.tablet.screenWidth) {
      setVisibleCount(visibleMovieCards.tablet.initCount);
      setScreenSize('tablet');
      console.log(screenSize, 'Set Screen')
    } else if (currenWidth > visibleMovieCards.tablet.screenWidth) {
      setVisibleCount(visibleMovieCards.desktop.initCount);
      setScreenSize('desktop');
      console.log(screenSize, 'Set Screen')
    }
  }

  const handleScreenResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= visibleMovieCards.mobile.screenWidth) {
      console.log('mobile')
      setVisibleCount(visibleMovieCards.mobile.initCount);
      // setScreenSize('mobile');
    }
    if (screenWidth <= visibleMovieCards.tablet.screenWidth) {
      setScreenSize('tablet');
      setVisibleCount(visibleMovieCards.tablet.initCount);
    }
    if (screenWidth > visibleMovieCards.tablet.screenWidth) {
      setScreenSize('desktop');
      setVisibleCount(visibleMovieCards.desktop.initCount);
    }
  };

  useEffect(() => {
    // handleScreenResize();
    if (totalMovies > visibleMovieCards[screenSize].initCount) {
      setIsMoreButtonPresent(true);
    }
    window.addEventListener('resize', test);
    return () => {
      window.removeEventListener('resize', test);
    };
  }, [])


  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm/>
        <MoviesCardList
          movieCardList={movieCardList.slice(0, visibleCount)}
          onMore={handleShowMore}
          isMoreButtonPresent={isMoreButtonPresent}/>
      </main>
      <Footer/>
    </>
  )
}

export default Movies