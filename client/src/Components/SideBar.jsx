import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
const SideBar = () => {
  let location = useParams();

  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    switch (location.id) {
      case 'history':
        setActiveIndex(1)
        break;
      case 'favorites':
        setActiveIndex(2)
        break;
      case 'bookmarks':
        setActiveIndex(3)
        break;
      case 'projects':
        setActiveIndex(4)
        break;
      default:
        setActiveIndex(0)
    }
  }, [location.id])

  const items = [
    {
      index: 'edit',
      img: "../images/profile/profile.png",
      text: "Редактировать профиль",
    },
    {
      index: 'history',
      img: "../images/profile/history.png",
      text: "История",
    },
    {
      index: 'favorites',
      img: "../images/profile/favorite.png",
      text: "Избранное",
    },
    {
      index: 'bookmarks',
      img: "../images/profile/bookmarks.png",
      text: "Закладки",
    },
    {
      index: 'projects',
      img: "../images/profile/project.png",
      text: "Проекты"
    },
  ];

  function onChapterSelect(activeIndex, pageIndex) {
    setActiveIndex(activeIndex)
    navigate(`/profile/${pageIndex}`)
  }

  return (
    <aside className="profile__sidebar sidebar">
      {items.map((obj, i) => {
        return (
          <div key={i} className="sidebar__item">
            <a onClick={() => onChapterSelect(i, obj.index)} className={activeIndex === i ? "sidebar__image active" : 'sidebar__image'}>
              <img className={activeIndex === i ? "active" : ''} src={obj.img} alt="" />
            </a>
            <a onClick={() => onChapterSelect(i, obj.index)} className={activeIndex === i ? "sidebar_text active" : 'sidebar_text'}>
              {obj.text}
            </a>
          </div>
        );
      })}
    </aside>
  );
};

export default SideBar;
