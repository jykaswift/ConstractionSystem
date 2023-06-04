import React from 'react';

const Bookmarks = () => {
  return (
    <div className="panels__bookmarks bookmarks">
      <div className="bookmarks__top">
        <div className="bookmarks__title">Закладки</div>
        <p className="bookmarks__counter">5 документов</p>
        <a href="" className="bookmarks__clear">Очистить</a>
        <a href="" className="bookmarks__clear-icon">
          <img src="../images/profile/clear.png" alt="" />
        </a>
      </div>

      <div className="bookmarks__item">
        <div className="bookmarks__doc">Свод правил СП 251.1325800.2016</div>
        <div className="bookmarks__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА
          ПРОЕКТИРОВАНИЯ
        </div>
        <div className="bookmarks__quantity">4 закладок</div>
        <a href="" className="bookmarks__expand">
          <span></span>
        </a>
      </div>
      <div className="bookmarks__item">
        <div className="bookmarks__doc">СНиП II-Л.4-62</div>
        <div className="bookmarks__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo, optio possimus. Amet blanditiis consequuntur doloribus, ducimus eligendi eum id libero magnam
          maiores quibusdam repudiandae rerum sit unde? Accusamus, assumenda ducimus esse facilis ipsum
          necessitatibus non porro quo quos sunt! Ratione.
        </div>
        <div className="bookmarks__quantity">4 закладок</div>
        <a href="" className="bookmarks__expand">
          <span></span>
        </a>
      </div>

      <div className="bookmarks__subitem subitem">
        <div className="subitem__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="subitem__delete">✖</a>
        <div className="subitem__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА ПРОЕКТИРОВАНИЯ
        </div>
        <div className="subitem__content">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>
      </div>
      <div className="bookmarks__subitem subitem">
        <div className="subitem__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="subitem__delete">✖</a>
        <div className="subitem__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА ПРОЕКТИРОВАНИЯ
        </div>
        <div className="subitem__content">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>
      </div>
      <div className="bookmarks__subitem subitem">
        <div className="subitem__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="subitem__delete">✖</a>
        <div className="subitem__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА ПРОЕКТИРОВАНИЯ
        </div>
        <div className="subitem__content">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>
      </div>


    </div>
  );
};

export default Bookmarks;