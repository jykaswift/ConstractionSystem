import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFromFavorites } from "../redux/slices/favoriteSlice";
import { setDocId } from "../redux/slices/docSlice";
import FavoriteService from "../services/FavoriteService";

const FavoriteItem = ({ name, elasticId }) => {
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useSelector((state) => state.auth);

  function onDeleteClicked() {
    FavoriteService.deleteFavorite(id, elasticId);
    dispatch(deleteFromFavorites(elasticId));
    setIsVisible(false);
  }

  function onItemClicked() {
    dispatch(setDocId(elasticId));
    navigate(`/doc?id=${elasticId}`);
  }

  return (
    <div className="favorite__item">
      <div onClick={onItemClicked} className="favorite__doc">
        {name}
      </div>
      <a onClick={onDeleteClicked} className="favorite__delete">
        ✖
      </a>
    </div>
  );
};

export default FavoriteItem;
