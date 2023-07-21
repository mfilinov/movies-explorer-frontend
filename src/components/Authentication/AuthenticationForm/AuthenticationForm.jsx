import "./AuthenticationForm.css"
import AuthenticationFormField from "./AuthenticationFormField/AuthenticationFormField";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import {Link} from "react-router-dom";
import {useState} from "react";
import {getErrorMessage} from "../../../utils/utils";
import {EMAIL_REGEX} from "../../../utils/constants";

function AuthenticationForm({type, onSubmit}) {
  const {values, handleChange, errors, isValid, setIsValid, setErrors} = useFormAndValidation();
  const [responseMessage, setResponseMessage] = useState('');

  function handleEmailChange(e) {
    handleChange(e);
    const {name, value} = e.target
    if (name === 'email' && (!EMAIL_REGEX.test(value))) {
      setIsValid(false);
      setErrors({...errors, email: 'Введите корректный email формата example@domain.com'})
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(values.name, values.email, values.password)
        .catch((e) => {
          const msg = getErrorMessage(e.status, 'При регистрации пользователя произошла ошибка.');
          setResponseMessage(msg);
          setIsValid(false);
        })
    } else {
      onSubmit(values.email, values.password)
        .catch((e) => {
          const msg = getErrorMessage(e.status, 'При авторизации произошла ошибка.');
          setResponseMessage(msg);
          setIsValid(false);
        });
    }
  }

  return (
    <form name={type} className="authentication__form" onSubmit={handleSubmit} noValidate>
      {{
        login: null,
        register: <AuthenticationFormField
          title="Имя"
          type="text"
          name="name"
          values={values}
          errors={errors}
          minLength={2}
          maxLength={30}
          handleChange={handleChange}
        />
      }[type]}
      <AuthenticationFormField
        title="E-mail"
        type="email"
        name="email"
        values={values}
        errors={errors}
        handleChange={handleEmailChange}
      />
      <AuthenticationFormField
        title="Пароль"
        type="password"
        name="password"
        values={values}
        errors={errors}
        minLength={8}
        maxLength={30}
        handleChange={handleChange}
      />
      <div className="authentication__form-basement">
        <p className="authentication__form-response authentication__form-response_type_error">
          {/* условие isValid чтобы убрать текст ошибки после ввода информации*/}
          {!isValid && responseMessage}
        </p>
        {{
          login: <ButtonSubmit text="Войти" disabled={!isValid}/>,
          register: <ButtonSubmit text="Зарегистрироваться" disabled={!isValid}/>
        }[type]}
        <p className="authentication__form-caption">
          {{
            login:
              <>
                Ещё не зарегистрированы?
                <Link to="/signup" className="authentication__form-link-caption link-hover">Регистрация</Link>
              </>,
            register:
              <>
                Уже зарегистрированы?
                <Link to="/signin" className="authentication__form-link-caption link-hover">Войти</Link>
              </>,
          }[type]}
        </p>
      </div>
    </form>
  )
}

export default AuthenticationForm
