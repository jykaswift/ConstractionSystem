import React from 'react';
import styles from '../styles/modules/notFound.module.scss'

const NotFound = () => {
  return (
    <div className="content">
      <div data-testid='notFound' className="container">
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Страница не найдена</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;