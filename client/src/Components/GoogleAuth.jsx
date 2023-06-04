import React from 'react';
import {googleLogin} from "../redux/slices/authSlice";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from "../styles/modules/auth.module.scss";

const GoogleAuth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async googleData => {
    let response = await dispatch(googleLogin(googleData))
    if (response.error) {
      return
    }
    navigate("/")
  }

  const login = useGoogleLogin({
    onSuccess: handleLogin,

  });

  return (
    <div className={styles.google}>
      <img src={'../images/auth/google.png'} />
      <span onClick={() => login()}>Вход Google</span>
    </div>
  );
};

export default GoogleAuth;