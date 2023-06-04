import React from 'react';
import styles from '../styles/modules/normastroi.module.scss'

const Normastroi = () => {
  return (
    <div className={styles.back}>
      <div className="container">
        <h1 className={styles.title}>
          Normastroy - Приложение для проверки зданий на соответствие НТД
        </h1>
        <div className={styles.flex}>
          <img src="../images/main/guide/norma.png" alt="" />
          <div className={styles.main}>
            <div className={styles.text}>
              <p className={styles.name}>Normastroy</p>
              <div>
                <p className={styles.about}>— это не только электронная база актуальных строительных ГОСТ-ов с возможностью поиска при помощи фильтров.</p>

                <p className={styles.about2}><span>Normastroy это также приложение для автоматизированной проверки зданий на соответствие НТД.</span></p>
              </div>

            </div>
            <div  className={styles.subabout}>Переди на сайт и узнай о возможностях Приложения для проверки зданий на соответствие нормативно — технической документации прямо сейчас.</div>
            <button className={styles.button}>Перейти на сайт</button>
            <div className={styles.footer}>
              <img src="../images/main/guide/logo.png" alt="" />
              <p>Проект разрабатывается при поддержке Фонда содействия инновациям в рамках федерального проекта «Платформа университетского технологического предпринимательства»</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Normastroi;
