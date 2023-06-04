import React, {useCallback, useRef, useState} from 'react';
import styles from "../styles/modules/doc.module.scss";
import debonce from "lodash.debounce";
import Finder from "../utils/Finder";
import {useDispatch} from "react-redux";
import {setDisableScroll, setScrollDirection} from "../redux/slices/stickySlice";

const DocNavSearch = () => {
  const dispatch = useDispatch()
  const [marks, setMarks] = useState([]);
  const [marksCoords, setMarksCoords] = useState([]);
  const marksCounter = useRef(0);
  const buttons = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const find = useCallback(
    debonce((word) => {
      let finder = new Finder("doc");
      let { marks, marksCoords } = finder.apply(word);
      setMarks(marks);
      setMarksCoords(marksCoords);
      marksCounter.current = 0;
      if (word && marks.length !== 0) {
        dispatch(setDisableScroll(true))
        dispatch(setScrollDirection(true));
        marks[0].style.backgroundColor = "orange";
        window.scrollTo(0, marksCoords[0]);
        buttons.current.style.display = "flex";
        setTimeout(function() {
          dispatch(setDisableScroll(false))
        }, 200);
      } else {
        buttons.current.style.display = "none";
        console.log('kek')
      }
    }, 800),
    []
  );

  function scrollToMark(isDown) {
    dispatch(setDisableScroll(true))
    if (marks.length === 1) {
      return;
    }
    marks[marksCounter.current].style.backgroundColor = "#ff6";
    if (isDown) {
      marksCounter.current += 1;
    } else {
      marksCounter.current -= 1;
    }
    if (marksCounter.current >= marks.length) {
      marksCounter.current = 0;
    }
    if (marksCounter.current < 0) {
      marksCounter.current = marks.length - 1;
    }
    marks[marksCounter.current].style.backgroundColor = "orange";
    window.scrollTo(0, marksCoords[marksCounter.current]);
    setTimeout(function() {
      dispatch(setDisableScroll(false))
    }, 200);
  }


  return (
    <div className={styles.input_bar}>
      <input
        type="text"
        placeholder="Поиск по документу"
        className={styles.search}
        onChange={(event) => find(event.target.value)}
      />
      <div ref={buttons} className={styles.search_buttons}>
        <img
          onClick={() => scrollToMark(true)}
          src="../images/doc/up.png"
          alt=""
        />
        <img
          onClick={() => scrollToMark(false)}
          src="../images/doc/up.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default DocNavSearch;