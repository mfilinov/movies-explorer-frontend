import "./SectionTitle.css"

function SectionTitle({children, additionalSectionTitleClassName = ''}) {
  return (
    <h2 className={`landing__section-title ${additionalSectionTitleClassName}`}>{children}</h2>
  )
}

export default SectionTitle