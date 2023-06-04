import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { setMenuStatus } from "../redux/slices/burgerMenuSlice";
import useScrollDirection from "../utils/ScrollDirection";
import Menu from "./Menu";


function Header() {
  const { scrollDirection } = useSelector((state) => state.sticky);

  useScrollDirection()
  const { isAuth, name, email, patronymic, lastname } = useSelector(
    (state) => state.auth
  );
  const { menuStatus } = useSelector((state) => state.burger);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogoutSubmit() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className={`header ${ scrollDirection ? "hide" : "show"}`}>
      <Menu />
      <div className="container">
        <div className="header__row">
          <a
            onClick={() => dispatch(setMenuStatus())}
            className={menuStatus ? "header__burger active" : "header__burger"}
          >
            <span></span>
          </a>
          <SearchInput />
          {isAuth ? (
            <div className="header__authed authed">
              <div className="authed__profile">
                <Link data-testid='profileButton' to={"/profile/edit"} className="authed__image">
                  <img src="../images/main/header/authed-profile.png" alt="" />
                </Link>
                <div className="authed__info">
                  <div className="authed__name">
                    {name} {lastname} {patronymic}
                  </div>
                  <div className="authed__mail">{email}</div>
                </div>
              </div>

              <a onClick={() => onLogoutSubmit()} className="authed__exit">
                <img src="../images/main/header/exit.png" alt="" />
              </a>
            </div>
          ) : (
            <div className="header__buttons">
              <Link data-testid='registration' to={"/registration"} className="header__register">
                Регистрация
              </Link>
              <Link to={"/login"} data-testid='auth' className="header__auth">
                Войти
              </Link>
            </div>
          )}

          <a onClick={() => {
            if (isAuth) {
              navigate("/profile/edit")
            } else {
              navigate('/login')
            }
          }} className="header__profile">
            <img
              src="../images/main/header/profile.png"
              alt=""
              className="profile__icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
