function Functions() {
  return (
    <div className="content__functions functions">
      <div className="container">
        <div className="title">Функции сервиса</div>
        <div className="functions__grid">
          <div className="functions__item">
            <img
              src="../images/main/functions/func-search.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Поиск</div>
            <div className="functions__subtitle">
              Поиск по системе фильтрации, ключевым словам и названиям среди
              документов и внутри них
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-save.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Сохранение</div>
            <div className="functions__subtitle">
              Возможность сохранения документов на личное устройство
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-create.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Создать проект</div>
            <div className="functions__subtitle">
              Возможность создания папок с проектом и добавлением ГОСТ-ов по
              нему
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-share.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Поделиться</div>
            <div className="functions__subtitle">
              Возможность поделиться ссылкой на документ
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-favorite.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Избранное</div>
            <div className="functions__subtitle">
              Возможность добавить документ в избранное
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-bookmarks.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Закладки</div>
            <div className="functions__subtitle">
              Возможность добавить документ в закладки для быстрого доступа
            </div>
          </div>
          <div className="functions__item">
            <img
              src="../images/main/functions/func-calc.png"
              alt=""
              className="functions__image"
            />
            <div className="functions__title">Расчет</div>
            <div className="functions__subtitle">
              Предоставляется возможность поиска информации на основании прямого
              и обратного расчета, при использовании данных о площади
              здания/помещения и количеству человек, размещаемых в проектируемом
              здании
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Functions;
