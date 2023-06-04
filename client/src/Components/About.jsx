import {useNavigate} from "react-router-dom";

function About() {

  const navigate = useNavigate();

  return (
    <div className="content__about about">
      <div className="container">
        <div className="title">О сервисе</div>
        <div className="subtitle">
          Для тех, кому необходимо знать всё о строительных нормах, технических
          правилах и стандартах
        </div>
        <div className="about__grid">
          <div className="about__info">
            <p className="about__text">
              Справочная электронная информационная система строительных
              ГОСТ-ов, созданная для упрощения поиска информации по
              нормативно-технической документации{" "}
            </p>
            <p className="about__text">
              <span>Поиск</span> информации осуществляется благодаря созданной{" "}
              <span>системе фильтраци</span> по типу здания, местоположению, а
              также при помощи ключевых слов, названию документа и номеру
              нормативно- техничского документа
            </p>
            <p className="about__text">
              <span>Сервис</span> также предоставляет возможность поиска
              информации на основании прямого и обратного расчетов.
              <br /> Имея в исходных данных площадь здания/помещения и
              размещаемое проектное количество человек, вы можете получить
              систематизированную информацию о возможностях проектирования в
              данных исходных условиях
            </p>
          </div>
          <a onClick={() => {
            navigate('/search?query=')
          }} className="about_button">
            Начать поиск
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
