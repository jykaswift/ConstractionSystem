import React from "react";
import { useDispatch } from "react-redux";
import { setDocId } from "../redux/slices/docSlice";
import { Link } from "react-router-dom";
import {reset} from "../redux/slices/searchSlice";

function FindItem({ name, id }) {
  const dispatch = useDispatch();

  function onTitleClicked() {
    dispatch(reset())
    dispatch(setDocId(id));
  }

  return (
    <div>
      <div className="find-item">
        <div className="find-item__info">
          <Link to={`/doc?id=${id}`} onClick={() => onTitleClicked()}>
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FindItem;
