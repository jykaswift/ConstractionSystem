import React from "react";
import styles from "../styles/modules/confirm.module.scss";
import { useSelector } from "react-redux";
import AuthService from "../services/AuthService";

const ConfirmEmail = () => {
  const { email, name, ps } = useSelector((state) => state.auth);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function onResendEmail() {
    AuthService.registration(name, email, ps)
    await sleep(15000);
  }


  return (
    <div className='content'>
      <div className="container">
        <div className={styles.confirmBlock}>
          <p>
            На ваш почтовый адрес {email} направлена ссылка на подтверждение
            аккаунта.
          </p>
          <p>
            Для завершения регистрации перейдите по ссылке.
          </p>
          <h1 onClick={onResendEmail}>Отправить письмо повторно.</h1>
        </div>
      </div>

    </div>
  );
};

export default ConfirmEmail;
