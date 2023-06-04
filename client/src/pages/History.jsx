import React, { useEffect, useRef } from "react";
import HistoryItem from "../Components/HistoryItem";
import styles from "../styles/modules/find.module.scss";
import {clearHistory, fetchHistory, reset} from "../redux/slices/historySlice";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import ModalWindow from "../Components/ModalWindow";
import HistoryService from "../services/HistoryService";

const History = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { id } = useSelector((state) => state.auth);
  const { items, total, currentPage, isFirstLoad, status } = useSelector(
    (state) => state.history
  );
  const dispatch = useDispatch();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const isMounted = useRef(false);


  function deleteAllHistory(id) {
    HistoryService.deleteAllHistory(id)
    dispatch(clearHistory());
  }

  useEffect(() => {
    dispatch(fetchHistory(id));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      if (inView === true) {
        const totalPages = Math.floor(total / 10);
        if (currentPage <= totalPages + 1) {
          dispatch(fetchHistory(id));
        }
      }
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, [id, inView, dispatch, total]);

  const notFound = () => (
    <div className={styles.notFound}>Вы ничего еще не искали</div>
  );

  const historyItems = () => (
    <>
      {items.map((obj) => {
        return (
          <HistoryItem
            key={obj["history_id"]}
            query={obj.request}
            date={obj.createdAt}
            count={obj.count}
            historyId={obj["history_id"]}
          />
        );
      })}
      <div ref={ref}></div>
      {status === "loading" ? <div className={styles.loader}></div> : <></>}
    </>
  );

  return (
    <div className="panels__history history">
      <div className="history__top">
        <div className="history__title">История поиска</div>
        <p className="history__counter">Найдено: {total}</p>
        <a onClick={() => setIsOpen(true)} className="history__clear">
          Очистить историю
        </a>
        <a onClick={() => setIsOpen(true)} className="history__clear-icon">
          <img src="../images/profile/clear.png" alt="" />
        </a>
      </div>

      {isFirstLoad ? (
        <div className={styles.loader}></div>
      ) : (
        <>{items.length === 0 ? notFound() : historyItems()}</>
      )}

      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        text={"очистить всю историю"}
        onClickYes={() => deleteAllHistory(id)}
      />
    </div>
  );
};

export default History;
