import "./AuthenticationForm.css"
import AuthenticationFormField from "./AuthenticationFormField/AuthenticationFormField";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import {Link} from "react-router-dom";

function AuthenticationForm({type, onSubmit}) {
  const {values, handleChange, errors, isValid} = useFormAndValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(values.name, values.email, values.password);
    } else {
      onSubmit(values.email, values.password);
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
        handleChange={handleChange}
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
