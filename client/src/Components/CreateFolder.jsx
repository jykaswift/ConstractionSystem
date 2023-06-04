import styles from "../styles/modules/doc.module.scss";


import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createProject, setCreateWarning} from "../redux/slices/projectSlice";



const CreateFolder = ({setCreate}) => {
  const dispatch = useDispatch();
  const [nameProject, setNameProject] = useState("");
  const { createWarning } = useSelector(
    (state) => state.project
  );
  const { id } = useSelector((state) => state.auth);

  async function onCreateProjectSubmit() {
    if (!nameProject) {
      dispatch(setCreateWarning("Название пустое"));
      return;
    }

    dispatch(createProject({ userId: id, name: nameProject }))
    setCreate(false)
  }

  return (
    <div className={styles.createFolderAccount}>
      <p>Создать папку проекта</p>
      <input
        type="text"
        onChange={(event) => setNameProject(event.target.value)}
        placeholder={"Название папки"}
      />

      {nameProject && (
        <p className={styles.createWarning}>{createWarning}</p>
      )}
      <button className={styles.addButton} onClick={onCreateProjectSubmit}>
        Создать
      </button>
    </div>
  );
};

export default CreateFolder;
