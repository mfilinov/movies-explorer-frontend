import "./SavedMovies.css"
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {movieCardList} from "../../utils/data";
import {useState} from "react";

function SavedMovies() {
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(false);
  const fetchSavedMoviesList = () => {
    return movieCardList.filter((movieCard) => movieCard.saved)
  }
  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm/>
        <MoviesCardList movieCardList={fetchSavedMoviesList()} isMoreButtonPresent={isMoreButtonPresent}/>
      </main>
      <Footer/>
    </>
  )
}

export default SavedMovies