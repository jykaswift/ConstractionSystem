import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

function Footer() {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div className="footer">
      <div className="footer__flex">
        <Link to={'/contacts'} className="footer__link">
          Контакты
        </Link>

        {!isAuth && (
          <>
            <Link to="/login" className="footer__link">
              Вход
            </Link>
            <Link to="/registration" className="footer__link">
              Регистрация
            </Link>
          </>
        )}

        <Link to="/about" className="footer__link">
          О нас
        </Link>
        <Link to="/filters" className="footer__link">
          К фильтрам
        </Link>
        <Link to="/contacts" className="footer__link">
          Обратная связь
        </Link>
      </div>
    </div>
  );
}

export default Footer;
