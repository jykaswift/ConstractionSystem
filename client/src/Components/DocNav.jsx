import React from "react";
import styles from "../styles/modules/doc.module.scss";
import {useDispatch, useSelector} from "react-redux";
import DocNavSearch from "./DocNavSearch";
import AddFolder from "./AddFolder";
import {
  setCreateFolder,
  setProjectClicked,
} from "../redux/slices/projectSlice";
import AddBookmark from "./AddBookmark";
import FavoriteDocument from "./FavoriteDocument";
import BookmarkButton from "./BookmarkButton";
import download from 'downloadjs'

const DocNav = () => {
  const { scrollDirection } = useSelector((state) => state.sticky);
  const { isAddBookView } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();
  const { isAddDocumentActive } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);

  return (
      <div className={!scrollDirection ? `${styles.navBlock} ${styles.active}` : styles.navBlock}>
        <div>
          {isAddDocumentActive && <AddFolder />}
          <div className={styles.navigation}>
            <FavoriteDocument />
            <BookmarkButton />
            <DocNavSearch />

            <a className={styles.icon}>
              <img src="../images/doc/send.png" alt="" />
            </a>
            <a onClick={async () => {

              const res = await fetch('/download/1');
              const blob = await res.blob();
              download(blob, 'test.pdf');

            }} className={styles.icon}>
              <img src="../images/doc/save.png" alt="" />
            </a>
            <a
              onClick={() => {

                if (isAuth) {
                  dispatch(setCreateFolder(false));
                  dispatch(setProjectClicked());
                }

              }}
              className={
                isAddDocumentActive
                  ? `${styles.icon} ${styles.active}`
                  : styles.icon
              }
            >
              <img src="../images/doc/add.png" alt="" />
            </a>
          </div>
          <div className={styles.bottom}></div>
        </div>
        {isAddBookView && <AddBookmark />}
      </div>
  );
};

export default DocNav;
