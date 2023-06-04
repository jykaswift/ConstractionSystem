import React from "react";
import {setDocId} from "../redux/slices/docSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setGoTo, setMenuActive} from "../redux/slices/bookmarkSlice";
import BookmarkService from "../services/BookmarkService";

const Bookmark = ({
  name,
  content,
  docId,
  setDocuments,
  count,
  setCount,
  documents,
  bookId
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onItemClicked() {
    dispatch(setDocId(docId));
    dispatch(setGoTo(bookId))
    navigate(`/doc?id=${docId}`);
  }

  function deleteBookmark() {

    try {
      BookmarkService.deleteBookmark(bookId)
    } catch (e) {
      console.log(e)
    }

    setDocuments(
      documents.filter(function (obj) {
        return obj["bookmark_id"] !== bookId;
      })
    );
    setCount(count - 1)

  }


  return (
    <div className="bookmarks__subitem subitem">
      <div className="subitem__doc" onClick={onItemClicked}>{name}</div>
      <a className="subitem__delete" onClick={deleteBookmark}>✖</a>
      <div className="subitem__content" onClick={onItemClicked}>
        {content.length > 200 ? content.substring(0, 200) +  "..." : content }
      </div>
    </div>
  );
};

export default Bookmark;