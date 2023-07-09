import "./ButtonSubmit.css"

function ButtonSubmit({disabled, text}) {
  return (
    <button
      type="submit"
      className={`button-submit button-hover button-submit_size_l button-submit_theme_blue${disabled ? ' button_disabled' : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default ButtonSubmit