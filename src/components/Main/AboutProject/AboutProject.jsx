import "./AboutProject.css"
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionTitle>О проекте</SectionTitle>
      <ul className="about-project__info-list list">
        <li className="about-project__info-element">
          <h3 className="about-project__info-title">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.</p>
        </li>
        <li className="about-project__info-element">
          <h3 className="about-project__info-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__info-subtitle">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__timeline-list list">
        <li className="about-project__timeline-element">
          <h3 className="about-project__timeline-title about-project__timeline-title_color_green">1&nbsp;неделя</h3>
          <p className="about-project__timeline-subtitle">Back-end</p>
        </li>
        <li className="about-project__timeline-element">
          <h3 className="about-project__timeline-title about-project__timeline-title_color_grey">4&nbsp;недели</h3>
          <p className="about-project__timeline-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject