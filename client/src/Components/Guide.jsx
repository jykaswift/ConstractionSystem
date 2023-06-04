import {Link} from "react-router-dom";

function Guide() {
  return (
    <div className="content__guide guide">
      <div className="container">
        <div className="title">Как это работает?</div>
        <div className="subtitle">
          Поиск НТД - проще, чем можно представить!
        </div>
        <div className="guide__flex">
          <div className="guide__item">
            <img src="../images/main/guide/search.png" alt="" />
            <p className="guide__text">
              <b>Пользуйся</b> сервисом поиска НТД по{" "}
              <b>
                <span>фильтрам</span>
              </b>{" "}
              и ключевым словам{" "}
            </p>
          </div>
          <div className="guide__item">
            <img src="../images/main/guide/register.png" alt="" />
            <p className="guide__text">
              <b>Зарегистрируйся,</b> чтобы получить{" "}
              <b>
                <span>бесплатный</span>
              </b>{" "}
              доступ к расширенному пакету функций
            </p>
          </div>
          <div className="guide__item">
            <img src="../images/main/guide/salut.png" alt="" />
            <p className="guide__text">
              <b>Ищи, сохраняй, делись, создавай!</b>
              <br /> Пользуйся{" "}
              <b>
                <span>сервисом поиска НТД</span>
              </b>{" "}
              и взаимодействуй с другими проектировщиками с помощью расширенного
              пакета опций и услуг
            </p>
          </div>
        </div>
        <Link to={'/registration'} className="guide__button">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}

export default Guide;
