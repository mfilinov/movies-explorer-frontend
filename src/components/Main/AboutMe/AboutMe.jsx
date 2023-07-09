import "./AboutMe.css"
import {Link} from "react-router-dom";
import studentPhoto from "../../../images/student.jpeg"
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutMe() {
  return (
    <section className="about-me about-me_size_l" id="about-me">
      <SectionTitle>Студент</SectionTitle>
      <div className="about-me__info">
        <div className="about-me__info-container">
          <h3 className="about-me__info-title">Виталий</h3>
          <p className="about-me__info-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__info-description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
            Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как
            прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и&nbsp;ушёл с&nbsp;постоянной
            работы.</p>
          <Link to="https://github.com/mfilinov" className="about-me__info-link link-hover"
                target="_blank">Github</Link>
        </div>
        <img className="about-me__photo" src={studentPhoto} alt="Фото студента"/>
      </div>
    </section>
  )
}

export default AboutMe