import "./Techs.css"
import {technologyList} from "../../../utils/data";
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {
  return (
    <section className="techs techs_size_l" id="techs">
      <SectionTitle additionalSectionTitleClassName="landing__section-title_height_s">Технологии</SectionTitle>
      <h3 className="techs__info-title">7&nbsp;технологий</h3>
      <p className="techs__info-subtitle">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили
        в дипломном проекте.</p>
      <ul className="techs__technology-list list">
        {technologyList.map((tech, i) => {
          return <li key={i} className="techs__technology-element">{tech}</li>
        })}
      </ul>
    </section>
  )
}

export default Techs