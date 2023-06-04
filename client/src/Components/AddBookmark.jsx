import React, {useState} from 'react';
import styles from "../styles/modules/doc.module.scss";
import {useDispatch, useSelector} from "react-redux";
import BookmarkService from "../services/BookmarkService";
import {addBookMenuItem, setAddBookView} from "../redux/slices/bookmarkSlice";


const AddBookmark = () => {
  const { selection } = useSelector((state) => state.bookmark);
  const dispatch = useDispatch()
  const { id: userId } = useSelector((state) => state.auth);
  const { id: docId, name: docName } = useSelector((state) => state.doc);
  const [name, setName] = useState('')

  async function onCreateClick() {
    const requestData = {
      ...selection,
      userId,
      docId,
      docName,
      name
    }

    try {
      let response = await BookmarkService.addBookmark(requestData)
      dispatch(addBookMenuItem({ ...requestData, "bookmark_id":  response.data}));
      dispatch(setAddBookView(false))
    } catch (e) {
      console.log(e)
    }


  }


  return (
    <div className={styles.addBookmark}>
      <p>Создать закладку</p>

      <div className={styles.inputBook}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder={"Название закладки"}
        />
        <button onClick={onCreateClick} className={styles.addButton}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default AddBookmark;