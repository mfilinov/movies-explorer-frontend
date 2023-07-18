import "./Profile.css"
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {mainApi} from "../../utils/MainApi";
import {getErrorMessage} from "../../utils/utils";

function Profile({setCurrentUser}) {
  const [isVisibleSubmit, setIsVisibleSubmit] = useState(false);
  const [response, setResponse] = useState({type: 'default', msg: ''});
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useFormAndValidation();
  const navigate = useNavigate();
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({name: user.name, email: user.email});
  }, [setValues, user.email, user.name]);

  function handleSubmit(e) {
    e.preventDefault();
    mainApi.updateUserProfile(values.name, values.email)
      .then(({name, email}) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email}))
        setIsVisibleSubmit(false);
        setResponse({type: 'success', msg: 'Данные пользователя обновлены успешно.'});
        // Перед следующей отправкой необходимо сменить хотя бы одно значение в input
        setIsValid(false);
      })
      .catch((e) => {
        const msg = getErrorMessage(e.status, 'При обновлении профиля произошла ошибка.');
        setResponse({type: 'error', msg: msg});
        setIsValid(false);
      })
  }

  function toggleSubmitState() {
    setIsVisibleSubmit(prev => !prev);
    setResponse({type: 'default', msg: ''});
  }

  function handleLogout(e) {
    localStorage.clear();
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
            {/* условие isValid чтобы убрать текст ошибки после ввода информации*/}
            {{
              success:
                <p className='profile__response profile__response_type_success'>
                  {!isValid && response.msg}
                </p>,
              error:
                <p className='profile__response profile__response_type_error'>
                  {!isValid && response.msg}
                </p>,
              default:
                <p className='profile__response'/>
            }[response.type]}
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
