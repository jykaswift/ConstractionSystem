import React, {useState} from 'react';
import styles from "../styles/modules/find.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import Bookmark from "./Bookmark";
import BookmarkService from "../services/BookmarkService";
import {useSelector} from "react-redux";

const BookmarksDocument = ({name, count, docId}) => {
  const [documentsVisible, setDocumentVisible] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [wasExpanded, setWasExpanded] = useState(false);
  const [countDocuments, setCount] = useState(count)
  const { id } = useSelector((state) => state.auth);

  async function expandDocument() {

    if (countDocuments > 0) {
      setDocumentVisible(!documentsVisible);

      if (!wasExpanded) {
        try {
          const response = await BookmarkService.getBookmarksInsideDoc(id, docId);
          setDocuments(response.data);
          setWasExpanded(true);
        } catch (e) {
          console.log(e);
        }
      }
    }

  }

  return (

    <>
      {countDocuments >= 1 && <div>
        <div className="bookmarks__item" onClick={expandDocument}>
          <div className="bookmarks__doc">{name}</div>
          <div className="bookmarks__quantity">{countDocuments} закладок</div>
          <a className={!documentsVisible ? "bookmarks__expand" : "bookmarks__expand active"}>
            <span></span>
          </a>
        </div>

        <AnimatePresence>
          {documentsVisible && (
            <>
              {!wasExpanded ? (
                <div className={styles.loader}></div>
              ) : (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    {documents.map((obj) => {
                      return (
                        <Bookmark
                          key={obj["bookmark_id"]}
                          content={obj.content}
                          docId={docId}
                          name={obj.name}
                          setDocuments={setDocuments}
                          count={countDocuments}
                          documents={documents}
                          setCount={setCount}
                          bookId={obj["bookmark_id"]}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>}
    </>

  );
};

export default BookmarksDocument;