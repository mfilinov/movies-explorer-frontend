import "./AuthenticationFormField.css"

function AuthenticationFormField({title, type, name, values, errors, handleChange}) {
  return (
    <label className="authentication__form-field-label">
      <span className="authentication__form-field-title">{title}</span>
      <input
        type={type}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        required
        minLength={type === "text" ? "2" : null}
        maxLength={type === "text" ? "30" : null}
        placeholder=""
        className="authentication__form-field-input"/>
      <span className="authentication__form-field-error">{errors[name]}</span>
    </label>
  )
}

export default AuthenticationFormField