import React, {useEffect, useState} from 'react';
import styles from "../styles/modules/doc.module.scss";
import FavoriteService from "../services/FavoriteService";
import {useDispatch, useSelector} from "react-redux";

const FavoriteDocument = () => {
  const dispatch = useDispatch();
  const { id: docId, name  } = useSelector((state) => state.doc);
  const { isAuth, id } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false)

  // Подстветка избранного если оно добавлено
  useEffect(() => {
    if (isAuth) {
      FavoriteService.isFavorite(id, docId)
        .then((res) => {
          setIsFavorite(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [isAuth, id, docId, dispatch]);


  async function onFavoriteClicked() {

    if (isAuth) {
      try {
        if (isFavorite) {
          FavoriteService.deleteFavorite(id, docId)
        } else {
          FavoriteService.addFavorite(id, docId, name)
        }
      } catch (e) {
        console.log(e)
      }
      setIsFavorite(!isFavorite)
    }
  }


  return (
    <a
      onClick={onFavoriteClicked}
      className={
        isFavorite ? `${styles.icon} ${styles.active}` : styles.icon
      }
    >
      <img src="../images/doc/favorite.png" alt="" />
    </a>
  );
};

export default FavoriteDocument;