function Advantages() {
  return (
    <div className="content__advantages advantages">
      <div className="container">
        <div className="title">С нами выгодно</div>
        <div className="advantages__flex">
          <p className="advantages__item">
            Поиск информации по базе НТД на основании прямого и обратного
            расчетов<span>по площади и количеству человек</span>
          </p>
          <p className="advantages__item">
            Возможность создания закладок и примечаний как к отдельному
            документу, так и к папке проекта
          </p>
          <p className="advantages__item">
            Добавление <span>документа</span> в “Избранное”
          </p>
          <p className="advantages__item">
            Возможность делиться папками проектов и ссылками на отдельный
            документ
          </p>
          <p className="advantages__item">
            Автоматизированное обновление актуальности{" "}
          </p>
          <p className="advantages__item">
            Возможность сохранения документа на личное устройство
          </p>
          <p className="advantages__item">Удобство поиска и работы с НТД</p>
          <p className="advantages__item">
            Поиск как самого НТД, так и внутри НТД по фильтрам и ключевым словам
          </p>
          <p className="advantages__item">
            Возможность создания и добавления НТД в отдельную папку проекта
          </p>
          <p className="advantages__item">
            Экономия времени поиска информации по НТД
          </p>
          <p className="advantages__item">
            Уведомление об изменении статуса НТД
          </p>
        </div>
        <img
          src="../images/main/advantages/dino.png"
          alt=""
          className="advantages__dino"
        />
      </div>
    </div>
  );
}

export default Advantages;
