import "./Profile.css"
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {mainApi} from "../../utils/MainApi";

function Profile({setCurrentUser}) {
  const [isVisibleSubmit, setIsVisibleSubmit] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useFormAndValidation();
  const navigate = useNavigate();
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({name: user.name, email: user.email});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    mainApi.updateUserProfile(values.name, values.email)
      .then(({name, email}) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email}))
        setIsVisibleSubmit(false);
        // Перед следующей отправкой необходимо сменить хотя бы одно значение в input
        setIsValid(false);
      })
      .catch((e) => {
        console.log(e)
        setIsServerError(true);
      })
  }

  function toggleSubmitState() {
    setIsVisibleSubmit(prev => !prev);
  }

  function handleLogout(e) {
    localStorage.removeItem('jwt');
    setCurrentUser(() => ({name: "", email: "", isLoggedIn: false}));
    mainApi.setToken('')
    navigate('/', {replace: true});
  }

  return (
    <>
      <Header/>
      <main className="page__auth">
        <section className="profile page__main page__main_type_profile">
          <h1 className="profile__title">Привет, {user.name}!</h1>
          <form
            name="profile-form"
            className="profile__form"
            noValidate
            onSubmit={handleSubmit}>
            <label className="profile__label">
              <span className='profile__input-title'>Имя</span>
              <input type="text"
                     name="name"
                     id="input-profile-name"
                     className="profile__input input-focus"
                     minLength="2"
                     maxLength="30"
                     placeholder=""
                     required
                     value={values.name || ""}
                     onChange={handleChange}
              />
            </label>
            <span className="profile__span-error">{errors.name}</span>
            <label className="profile__label">
              <span className='profile__input-title'>E-mail</span>
              <input type="email"
                     name="email"
                     id="input-profile-email"
                     className="profile__input input-focus"
                     placeholder=""
                     required
                     value={values.email || ""}
                     onChange={handleChange}
              />
            </label>
            <span className="profile__span-error">{errors.email}</span>
            <p className='profile__response-error'>
              {isServerError && 'При обновлении профиля произошла ошибка.'}
            </p>
            <div className="profile__button-container">
              {isVisibleSubmit
                ?
                <ButtonSubmit text="Сохранить" disabled={!isValid}/>
                :
                <>
                  <button type="button" className="profile__button-edit button-hover" onClick={toggleSubmitState}>
                    Редактировать
                  </button>
                  <button type="button" className="profile__button-logout button-hover" onClick={handleLogout}>
                    Выйти из аккаунта
                  </button>
                </>
              }
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile
