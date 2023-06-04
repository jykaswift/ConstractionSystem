import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setMenuStatus} from "../redux/slices/burgerMenuSlice";


const MenuItem = ({link, id, text, testId}) => {
  const dispatch = useDispatch()
  return (
    <li onClick={() => dispatch(setMenuStatus(false))} className={id}>
      <Link data-testid={testId} to={link} id={id} className="menu__item">
        {text}
      </Link>
    </li>
  );
};

export default MenuItem;