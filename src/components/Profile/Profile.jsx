import "./Profile.css"
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

function Profile() {
  const [isVisibleSubmit, setIsVisibleSubmit] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'pochta@yandex.ru'});
  const [isServerError, setIsServerError] = useState(false);
  const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();

  useEffect(() => {
    setValues({profileName: currentUser.name, profileEmail: currentUser.email});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsServerError(true);
  }

  function toggleSubmitState() {
    setIsVisibleSubmit(prev => !prev);
  }

  return (
    <>
      <Header/>
      <main className="profile page__main">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          name="profile-form"
          className="profile__form"
          noValidate
          onSubmit={handleSubmit}>
          <label className="profile__label">
            <span className='profile__input-title'>Имя</span>
            <input type="text"
                   name="profileName"
                   id="input-profile-name"
                   className="profile__input"
                   minLength="2"
                   maxLength="30"
                   required
                   value={values.profileName || ""}
                   onChange={handleChange}
            />
          </label>
          <span className="profile__span-error">{errors.profileName}</span>
          <label className="profile__label">
            <span className='profile__input-title'>E-mail</span>
            <input type="email"
                   name="profileEmail"
                   id="input-profile-email"
                   className="profile__input"
                   required
                   value={values.profileEmail || ""}
                   onChange={handleChange}
            />
          </label>
          <span className="profile__span-error">{errors.profileEmail}</span>
          <p className='profile__response-error'>
            {isServerError && 'При обновлении профиля произошла ошибка.'}
          </p>
          <div className="profile__button-container">
            {isVisibleSubmit
              ?
              <ButtonSubmit text="Сохранить" disabled={!isValid}/>
              :
              <>
                <button type="button" className="profile__button-edit link-opacity" onClick={toggleSubmitState}>
                  Редактировать
                </button>
                <Link to="/signin" className="profile__logout-link link-opacity">Выйти из аккаунта</Link>
              </>
            }
          </div>
        </form>
      </main>
    </>
  )
}

export default Profile