import React, { useState } from "react";
import styles from "../styles/modules/doc.module.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocument,
  createProject,
  setCreateFolder,
  setCreateWarning,
} from "../redux/slices/projectSlice";

const AddFolder = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [nameProject, setNameProject] = useState("");
  const { isCreateFolderActive, selectOptions, createWarning } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth);
  const { name, id: elasticId } = useSelector((state) => state.doc);

  async function onCreateProjectSubmit() {
    if (!nameProject) {
      dispatch(setCreateWarning("Название пустое"));
      return;
    }

    if (!selectOptions.some((e) => e.label === nameProject)) {
      dispatch(createProject({ userId: id, name: nameProject }));
    } else {
      dispatch(setCreateWarning("Название занято"));
    }
  }

  async function onAddClicked() {
    if (selectedOption) {
      let reqObj = {
        projectId: selectedOption.value,
        elasticId: elasticId,
        docName: name,
      };
      dispatch(addDocument(reqObj))
    }
  }

  return (
    <div className={styles.addFolder}>
      <div className={styles.addDocument}>
        <p>Добавить в папку проекта</p>
        <Select
          classNamePrefix="reactSelect"
          onChange={setSelectedOption}
          placeholder={"Название проекта"}
          noOptionsMessage={() => "Нет созданных папок"}
          options={selectOptions}
        />

        <div className={styles.folderButtons}>
          <button
            className={styles.addButton}
            disabled={!selectedOption}
            onClick={onAddClicked}
          >
            Добавить
          </button>
          <button
            className={styles.createButton}
            onClick={() => dispatch(setCreateFolder(true))}
          >
            Создать папку проекта
          </button>
        </div>
      </div>

      {isCreateFolderActive && (
        <div className={styles.create}>
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
      )}
    </div>
  );
};

export default AddFolder;
