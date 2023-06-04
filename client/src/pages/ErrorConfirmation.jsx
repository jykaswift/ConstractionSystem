import React from "react";
import styles from "../styles/modules/confirm.module.scss";

const ErrorConfirmation = () => {
  return (
    <div className="content">
      <div className="container">
        <div className={styles.confirmBlock}>
          <p>
            Ссылка больше не действительна.
          </p>
          <h1>Зарегистрироваться</h1>
        </div>
      </div>
    </div>
  );
};

export default ErrorConfirmation;
