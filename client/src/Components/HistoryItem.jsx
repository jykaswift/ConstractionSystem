import React, {useState} from "react";
import { setSearchParams } from "../redux/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {deleteOneHistory} from "../redux/slices/historySlice";
import HistoryService from "../services/HistoryService";

const HistoryItem = ({ query, date, count, historyId }) => {

  const [isVisible, setIsVisible] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useSelector((state) => state.auth);


  function onDeleteClicked() {
    HistoryService.deleteCertainHistory(id, historyId)
    dispatch(deleteOneHistory())
    setIsVisible(false)
  }

  function onItemClicked() {
    dispatch(setSearchParams(query));
    navigate(`/search?query=${query}`);
  }

  return (
    <>
      {isVisible ? <div className="history__item">
        <p onClick={() => {onItemClicked();}} className="history__query" >
          Выполнен поиск по запросу: <span>{query}</span>
        </p>
        <div className="history__delete" onClick={() => {onDeleteClicked();}}>✖</div>
        <div className="history__flex">
          <p className="history__docs" >{count} документов</p>
          <p className="history__date">{date}</p>
        </div>
      </div> : <></>}
    </>
  );
};

export default HistoryItem;
