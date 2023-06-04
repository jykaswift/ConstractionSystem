import React, { useState } from "react";
import { setDocId } from "../redux/slices/docSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectService from "../services/ProjectService";

const FolderDocument = ({
  elasticId,
  name,
  docId,
  projectId,
  documents,
  setDocuments,
  count,
  setCount,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  function onItemClicked() {
    dispatch(setDocId(elasticId));
    navigate(`/doc?id=${elasticId}`);
  }

  function onDeleteClicked() {

    try {
      ProjectService.deleteDocuments(projectId, docId)
    } catch (e) {
      console.log(e)
    }

    setDocuments(
      documents.filter(function (obj) {
        return obj["document_id"] !== docId;
      })
    );
    setCount(count - 1)
    setIsVisible(false);
  }

  return (
    <>
      {isVisible && (
        <div className="projects__content">
          <div className="projects__doc" onClick={onItemClicked}>
            {name}
          </div>
          <a className="projects__delete" onClick={onDeleteClicked}>
            ✖
          </a>
        </div>
      )}
    </>
  );
};

export default FolderDocument;
