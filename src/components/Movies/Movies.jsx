import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {movieCardList} from "../../utils/data";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useState} from "react";

function Movies() {
  const [isMoreButtonPresent, setIsMoreButtonPresent] = useState(true);
  return (
    <>
      <Header/>
      <main className="page__main page__main_type_movies">
        <SearchForm/>
        <MoviesCardList movieCardList={movieCardList} isMoreButtonPresent={isMoreButtonPresent}/>
      </main>
      <Footer/>
    </>
  )
}

export default Movies