import "./AboutMe.css"
import {Link} from "react-router-dom";
import studentPhoto from "../../../images/student.jpeg"
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionTitle>Студент</SectionTitle>
      <div className="about-me__info">
        <div className="about-me__info-container">
          <h3 className="about-me__info-title">Максим</h3>
          <p className="about-me__info-subtitle">Фронтенд-разработчик, 36&nbsp;лет</p>
          <p className="about-me__info-description">Я&nbsp;живу в&nbsp;Москве, закончил факультет нано-
            и&nbsp;биомедицинских технологий СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку,
            а&nbsp;ещё увлекаюсь плаванием. Начал писать скрипты на&nbsp;python для автоматизации сетевого оборудвоания
            с&nbsp;2017. В&nbsp;2023 решил расширить кругозор и&nbsp;пройти курс по&nbsp;веб-разработке.</p>
          <Link to="https://github.com/mfilinov" className="about-me__info-link link-opacity" target="_blank">Github</Link>
        </div>
        <img className="about-me__photo" src={studentPhoto} alt="Фото студента"/>
      </div>
    </section>
  )
}

export default AboutMe