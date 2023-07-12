import "./AuthenticationFormField.css"

function AuthenticationFormField({title, type, name, values, errors, handleChange, minLength = null, maxLength = null}) {
  return (
    <label className="authentication__form-field-label">
      <span className="authentication__form-field-title">{title}</span>
      <input
        type={type}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        required
        minLength={minLength}
        maxLength={maxLength}
        placeholder=""
        className="authentication__form-field-input input-focus"/>
      <span className="authentication__form-field-error">{errors[name]}</span>
    </label>
  )
}

export default AuthenticationFormField