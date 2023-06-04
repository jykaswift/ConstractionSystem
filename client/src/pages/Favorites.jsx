import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import styles from "../styles/modules/find.module.scss";
import {clearFavorite, fetchFavorite, reset} from "../redux/slices/favoriteSlice";
import FavoriteItem from "../Components/FavoriteItem";
import ModalWindow from "../Components/ModalWindow";
import FavoriteService from "../services/FavoriteService";

const Favorites = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { id } = useSelector((state) => state.auth);
  const { items, total, currentPage, isFirstLoad, status } = useSelector(
    (state) => state.favorite
  );
  const dispatch = useDispatch();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const isMounted = useRef(false);


  useEffect(() => {
    dispatch(fetchFavorite(id));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      if (inView === true) {
        const totalPages = Math.floor(total / 10);
        if (currentPage <= totalPages + 1) {
          dispatch(fetchFavorite(id));
        }
      }
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, [id, inView, dispatch, total]);

  const notFound = () => (
    <div className={styles.notFound}>У вас нет избранных документов</div>
  );

  const favoriteItems = () => (
    <>
      {items.map((obj) => {
        return (
          <FavoriteItem
            key={obj["document_id"]}
            name={obj['doc_name']}
            elasticId={obj['elastic_id']}
          />
        );
      })}
      <div ref={ref}></div>
      {status === "loading" ? <div className={styles.loader}></div> : <></>}
    </>
  );

  function deleteAllFavorite(id) {
    FavoriteService.deleteAllFavorite(id)
    dispatch(clearFavorite());
  }

  return (
    <div className="panels__favorite favorite">
      <div className="favorite__top">
        <div className="favorite__title">Избранное</div>
        <p className="favorite__counter">{items.length} документов</p>
        <a onClick={() => setIsOpen(true)} className="favorite__clear">
          Очистить
        </a>
        <a onClick={() => setIsOpen(true)} className="favorite__clear-icon">
          <img src="../images/profile/clear.png" alt="" />
        </a>
      </div>
      {isFirstLoad ? (
        <div className={styles.loader}></div>
      ) : (
        <>{items.length === 0 ? notFound() : favoriteItems()}</>
      )}

      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        text={"удалить все избранные документы"}
        onClickYes={() => deleteAllFavorite(id)}
      />
    </div>
  );
};

export default Favorites;