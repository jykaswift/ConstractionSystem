import React, {useEffect} from 'react';
import BookmarksDocument from "../Components/BookmarksDocument";
import styles from "../styles/modules/find.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {clearDocuments, getBookmarksDocs} from "../redux/slices/bookmarkSlice";
import ModalWindow from "../Components/ModalWindow";
import BookmarkService from "../services/BookmarkService";


const Bookmarks = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { documents, documentFetchingStatus, documentsCount } = useSelector(
    (state) => state.bookmark
  );
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBookmarksDocs(id));
  }, [dispatch, id]);

  function deleteAllBookmarks(id) {
    BookmarkService.deleteAllBookmarks(id)
    dispatch(clearDocuments())
  }

  return (
    <div className="panels__bookmarks bookmarks">
      <div className="bookmarks__top">
        <div className="bookmarks__title">Закладки</div>
        <p className="bookmarks__counter">{documentsCount} документов</p>
        <a  onClick={() => setIsOpen(true)} className="bookmarks__clear">
          Очистить
        </a>
        <a onClick={() => setIsOpen(true)} className="bookmarks__clear-icon">
          <img src="../images/profile/clear.png" alt="" />
        </a>
      </div>

      {documentFetchingStatus === "loading" ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {documents.length === 0 ? (
            <div className={styles.notFound}>У вас нет закладок</div>
          ) : (
            <>
              {documents.map((obj) => {
                return (
                  <BookmarksDocument
                    key={obj["document_id"]}
                    name={obj['doc_name']}
                    count={obj.count}
                    docId={obj.docId}
                  />
                );
              })}
            </>
          )}
        </>
      )}

      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        text={"удалить закладки из всех документов?"}
        onClickYes={() => deleteAllBookmarks(id)}
      />
    </div>
  );
};

export default Bookmarks;