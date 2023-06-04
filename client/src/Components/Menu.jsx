import {  useSelector } from "react-redux";
import MenuItem from "./MenuItem";

function Menu() {
  const { isAuth } = useSelector((state) => state.auth);
  const { menuStatus } = useSelector((state) => state.burger);
  const { scrollDirection } = useSelector((state) => state.sticky);

  return (
    <nav className={!menuStatus || scrollDirection ? "menu" : "menu active"}>
      <ul className="menu__list">
        <div className="menu__line"></div>
        <div className="menu__li">
          <MenuItem testId='menu-main' link={"/"} id={"li1"} text={"Главная"} />
          <MenuItem testId='menu-about' link={"/about"} id={"li2"} text={"О нас"} />
          <MenuItem testId='menu-filters' link={"/filters"} id={"li3"} text={"К фильтрам"} />
          <MenuItem testId='menu-calc' link={"/calculate"} id={"li4"} text={"Расчет"} />

          {!isAuth && (
            <>
              <MenuItem
                testId='menu-register'
                link={"/registration"}
                id={"li5"}
                text={"Регистрация"}
              />
              <MenuItem testId='menu-login' link={"/login"} id={"li6"} text={"Войти"} />
            </>
          )}

          {isAuth && (
            <>
              <MenuItem
                link={"/profile/history"}
                id={"li7"}
                text={"История поиска"}
                testId='menu-history'
              />
              <MenuItem
                link={"/profile/projects"}
                id={"li8"}
                text={"Папки проектов"}
                testId='menu-folders'
              />
              <MenuItem
                link={"/profile/favorites"}
                id={"li9"}
                text={"Избранное"}
                testId='menu-favorite'
              />
              <MenuItem
                link={"/profile/bookmarks"}
                id={"li10"}
                text={"Закладки"}
                testId='menu-bookmarks'
              />
            </>
          )}

          <MenuItem testId='menu-contact' link={"/contacts"} id={"li11"} text={"Контакты"} />
          <MenuItem link={"/contacts"} id={"li12"} text={"Обратная связь"} />
          <MenuItem
            link={"/accepts"}
            id={"li13"}
            text={"Пользовательское соглашение"}
          />
          <MenuItem
            link={"/politic"}
            id={"li14"}
            text={"Политика конфиденциальности"}
          />
          <MenuItem
            link={"/advertisements"}
            id={"li15"}
            text={"Информация для рекламодателей"}
          />
        </div>
      </ul>
    </nav>
  );
}

export default Menu;
