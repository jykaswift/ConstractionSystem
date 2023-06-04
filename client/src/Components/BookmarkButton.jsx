import React, { useEffect } from "react";
import styles from "../styles/modules/doc.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMenuActive } from "../redux/slices/bookmarkSlice";
import Highlighter from "../utils/Highlighter";
import { setDisableScroll } from "../redux/slices/stickySlice";

const BookmarkButton = () => {
  const dispatch = useDispatch();
  const { isMenuActive, goToBook } = useSelector((state) => state.bookmark);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (goToBook) {
      dispatch(setMenuActive(true));
    }
  }, [dispatch, goToBook]);

  function onBookmarkClick() {
    if (isAuth) {
      dispatch(setDisableScroll(true));
      Highlighter.deleteHighlight();
      dispatch(setMenuActive(!isMenuActive));
      setTimeout(function() {
        dispatch(setDisableScroll(false))
      }, 200);
    }
  }

  return (
    <a
      className={isMenuActive ? `${styles.icon} ${styles.active}` : styles.icon}
      onClick={onBookmarkClick}
    >
      <img src="../images/doc/bookmark.png" alt="" />
    </a>
  );
};

export default BookmarkButton;