import React, { useState } from "react";
import FolderDocument from "./FolderDocument";
import ProjectService from "../services/ProjectService";
import styles from "../styles/modules/find.module.scss";
import { motion, AnimatePresence} from 'framer-motion'
import {useDispatch} from "react-redux";
import {deleteProject} from "../redux/slices/projectSlice";

const ProjectFolder = ({ count, name, projectId }) => {
  const [documentsVisible, setDocumentVisible] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [wasExpanded, setWasExpanded] = useState(false);
  const dispatch = useDispatch()
  const [countDocuments, setCount] = useState(count)
  async function expandDocuments() {

    if (countDocuments > 0) {
      setDocumentVisible(!documentsVisible);

      if (!wasExpanded) {
        try {
          const response = await ProjectService.getDocuments(projectId);
          setDocuments(response.data);
          setWasExpanded(true);
        } catch (e) {
          console.log(e);
        }
      }
    }

  }

  function deleteProj() {
    try {
      ProjectService.deleteProject(projectId)
      dispatch(deleteProject(projectId))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="projects__folders" >
        <div className="projects__name" onClick={expandDocuments}>{name}</div>
        <div className="projects__quantity" onClick={expandDocuments}>{countDocuments} документов</div>
        <a className="projects__delete" onClick={deleteProj}>
          ✖
        </a>
      </div>
      <AnimatePresence>
        {documentsVisible && (
          <>
            {!wasExpanded ? (
              <div className={styles.loader}></div>
            ) : (
              <motion.div
                initial={{height: 0}}
                animate={{height: 'auto'}}
                exit={{height: 0}}
                style={{overflow: 'hidden'}}
                transition={{duration: 0.2}}
              >
                <div>
                  {documents.map((obj) => {
                    return (
                      <FolderDocument
                        key={obj["elastic_id"]}
                        elasticId={obj["elastic_id"]}
                        name={obj["doc_name"]}
                        docId={obj["document_id"]}
                        projectId={projectId}
                        documents={documents}
                        setDocuments={setDocuments}
                        count={countDocuments}
                        setCount={setCount}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectFolder;
