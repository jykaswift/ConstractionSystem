import React from "react";
import SideBar from "../Components/SideBar";
import EditProfile from "./EditProfile";
import History from "./History";
import Favorites from "./Favorites";
import Bookmarks from "./Bookmarks";
import Projects from "./Projects";
import {Link, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";

const Profile = () => {
  let location = useParams();
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div data-testid='profile' className="content">
      {!isAuth ? (
        <Unauthorized />
      ) : (
        <div className="content">
          <div className="container">
            <div className="content__top top">
              <div className="top__title">Личный кабинет</div>
              <div className="top__flex">
                <span className="top__arrow">←</span>
                <Link to="/" className="top__back">
                  Главная
                </Link>
              </div>
            </div>
            <hr />

            <div className="content__profile profile">
              <SideBar />
              <div className="profile__panels panels">
                {location.id === "edit" ? <EditProfile /> : <></>}
                {location.id === "history" ? <History /> : <></>}
                {location.id === "favorites" ? <Favorites /> : <></>}
                {location.id === "bookmarks" ? <Bookmarks /> : <></>}
                {location.id === "projects" ? <Projects /> : <></>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
