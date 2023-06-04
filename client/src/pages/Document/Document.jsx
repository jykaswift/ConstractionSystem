import React from "react";
import DocNav from "../../Components/DocNav";
import styles from "../../styles/modules/doc.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocsById, setDocId } from "../../redux/slices/docSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchProjectNames } from "../../redux/slices/projectSlice";
import DocSkeleton from "./DocSkeleton";
import {setDisableScroll} from "../../redux/slices/stickySlice";
import {setAddBookView, setSelection} from "../../redux/slices/bookmarkSlice";
import BookmarkService from "../../services/BookmarkService";
import BookmarkMenu from "../../Components/BookmarkMenu";

const Document = () => {
  const { isAuth, id: userId } = useSelector((state) => state.auth);
  const { content, name, id, status } = useSelector((state) => state.doc);
  const { isMenuActive } = useSelector((state) => state.bookmark);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setDocId(params.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDocsById());
    }
  }, [dispatch, id]);

  // Получение всех названий проектов
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchProjectNames(userId));
    }
  }, [dispatch, isAuth, userId]);

  // Отслеживание нажатия на ссылки документа
  let contentClickHandler = (e) => {
    dispatch(setAddBookView(false))
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    const rowIndex = targetLink.getAttribute("ri");
    if (!rowIndex) {
      const relativeId = targetLink.getAttribute("rd");
      window.scrollTo(0, 0);
      dispatch(setDocId(relativeId));
      navigate(`/doc?id=${relativeId}`);
    } else {
      dispatch(setDisableScroll(true))
      const element = document.querySelector(`[id="${Number(rowIndex) + 1}"]`);
      const coords = element.getBoundingClientRect().top + document.documentElement.scrollTop - 150;
      window.scrollTo(0, coords);
      element.classList.add("anim-row");

      setTimeout(function () {
        dispatch(setDisableScroll(false));
      }, 200);
      setTimeout(function () {
        element.classList.remove("anim-row");
      }, 2000);
    }
  };

  // Нажатие кнопок назад-вперед  (для обновления документа)

  useEffect(() => {
    window.onpopstate = () => {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setDocId(params.id));
    };
  });

  function contextMenuHandle(e) {
    if (isAuth) {
      const selection = window.getSelection()
      if (!selection.toString()) {
        return
      }
      e.preventDefault()
      const selectionData = BookmarkService.getSelectionData(selection)
      dispatch(setSelection(selectionData))
      dispatch(setAddBookView(true))
    }

  }

  return (
    <div className="content">
      <div className="container">
        {status === "loading" ? (
          <DocSkeleton />
        ) : (
          <>
            <div className={styles.title}>{name}</div>
            {/*  text-right  font-semibold text-center py-1 text-justify indent-7 mt-3 table-auto border-collapse w-full lg:text-xl px-0.5 border border-gray-900 padding-left: 3pt;padding-right: 3pt;padding-top: 5pt;padding-bottom: 5pt; */}
            <div className={styles.container}>
              {isMenuActive && <BookmarkMenu />}
              <div className={styles.main}>
                <DocNav />
                <div className={styles.content}>
                  <div
                    onContextMenu={contextMenuHandle}
                    id="doc"
                    onClick={contentClickHandler}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>

            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Document;
