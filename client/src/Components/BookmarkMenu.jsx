import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import BookmarkMenuItem from "./BookmarkMenuItem";
import {getBookmarksInsideDoc, setGoTo, setMenuActive} from "../redux/slices/bookmarkSlice";

const BookmarkMenu = () => {
  const { scrollDirection } = useSelector((state) => state.sticky);
  const { id: userId } = useSelector((state) => state.auth);
  const { id: docId } = useSelector((state) => state.doc);
  const { menuItems, goToBook, status } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
    if(goToBook) {
      if (status === 'done') {
        const bookmark = document.querySelector(`[bi="${goToBook}"]`)
        bookmark.click()
        dispatch(setGoTo(''))
      }
    }
    } else {
      isMounted.current = true
    }

  }, [dispatch, goToBook, status])

  useEffect(() => {
    return () => {
      dispatch((setMenuActive(false)))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getBookmarksInsideDoc({userId, docId}))
  }, [dispatch, docId, userId]);

  return (
    <div className={!scrollDirection ? `book-menu active` : "book-menu"}>
      <h1>Закладки</h1>
      {menuItems.map((obj) => {
        return (
          <BookmarkMenuItem
            key={obj["bookmark_id"]}
            bookId={obj["bookmark_id"]}
            name={obj.name}
            lastString={obj.lastString}
            rowStart={obj.rowStart}
            rowEnd={obj.rowEnd}

          />
        );
      })}
    </div>
  );
};

export default BookmarkMenu;
