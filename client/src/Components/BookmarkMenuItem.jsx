import React, {useRef} from "react";
import Highlighter from "../utils/Highlighter";
import {setDisableScroll} from "../redux/slices/stickySlice";
import {useDispatch} from "react-redux";

const BookmarkMenuItem = ({ name, rowStart, rowEnd, lastString, bookId }) => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  function onMenuItemClick() {
    dispatch(setDisableScroll(true));
    Highlighter.deleteHighlight();
    ref.current.classList.add('highlight');
    Highlighter.highlight(rowStart, rowEnd, lastString);
    const scrollTo =
      document.getElementById(rowStart).getBoundingClientRect().top +
      document.documentElement.scrollTop -
      150;

    window.scrollTo(0, scrollTo)
    setTimeout(function () {
      dispatch(setDisableScroll(false));
    }, 200);
  }


  return (
      <p ref={ref} bi={bookId} onClick={onMenuItemClick}>{name}</p>
  );
};

export default BookmarkMenuItem;