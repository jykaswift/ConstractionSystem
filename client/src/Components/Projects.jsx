import React from 'react';

const Projects = () => {
  return (
    <div className="panels__projects projects">
      <div className="projects__top">
        <div className="projects__title">Папки проектов</div>
        <p className="projects__counter">количество: 4</p>
        <a href="" className="projects__clear">+</a>
      </div>

      <div className="projects__folders">
        <div className="projects__name">Общая папка</div>
        <div className="projects__quantity">4 документов</div>
        <a href="" className="projects__expand">
          <span></span>
        </a>
      </div>

      <div className="projects__content">
        <div className="projects__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="projects__delete">✖</a>
        <div className="projects__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА
          ПРОЕКТИРОВАНИЯ
        </div>
        <div className="projects__info">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>

      </div>
      <div className="projects__content">
        <div className="projects__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="projects__delete">✖</a>
        <div className="projects__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА
          ПРОЕКТИРОВАНИЯ
        </div>
        <div className="projects__info">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>

      </div>
      <div className="projects__content">
        <div className="projects__doc">Свод правил СП 251.1325800.2016</div>
        <a href="" className="projects__delete">✖</a>
        <div className="projects__description">ЗДАНИЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ОРГАНИЗАЦИЙ. ПРАВИЛА
          ПРОЕКТИРОВАНИЯ
        </div>
        <div className="projects__info">“Расчетная площадь вестибюля определяется суммарной площадью по
          7.2.15.1 с учетом дополнительной площади, равной сумме площадей рабочей зоны турникетов, зоны
          ожидания родителей”
        </div>

      </div>
    </div>
  );
};

export default Projects;