import React, { useEffect, useState } from "react";
import ProjectFolder from "../Components/ProjectFolder";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/slices/projectSlice";
import styles from "../styles/modules/find.module.scss";
import CreateFolder from "../Components/CreateFolder";

const Projects = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { folders, foldersFetchingStatus, foldersCount } = useSelector(
    (state) => state.project
  );

  const [createIsOpen, setCreate] = useState(false)

  useEffect(() => {
    dispatch(getProjects(id));
  }, [dispatch, id]);

  return (
    <div className="panels__projects projects">
      <div className="projects__top">
        {createIsOpen && <CreateFolder setCreate />}
        <div className="projects__title">Папки проектов</div>
        <p className="projects__counter">количество: {foldersCount}</p>
        <a onClick={() => setCreate(!createIsOpen)} className={createIsOpen ? 'projects__clear active' : 'projects__clear' }>
          +
        </a>
      </div>

      {foldersFetchingStatus === "loading" ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          {folders.length === 0 ? (
            <div className={styles.notFound}>У вас нет проектов</div>
          ) : (
            <>
              {folders.map((obj) => {
                return (
                  <ProjectFolder
                    key={obj["project_id"]}
                    name={obj.name}
                    count={obj.count}
                    projectId={obj["project_id"]}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
