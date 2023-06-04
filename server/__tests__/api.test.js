const request = require("supertest");
const { app } = require("../index");
const {
  UserToken,
  UserAccount,
  UserLoginInfo,
  UserHistory,
  Document,
} = require("../models/models");
const tokenService = require("../service/TokenService");
const bcrypt = require("bcrypt");
const assert = require("assert");
describe("Получение документов", () => {
  it("Запрос на существующий документ", async () => {
    await request(app)
      .get("/api/doc/document?id=lcbjh2yIhbwqpSiqEr-Whdad")
      .expect(500);
  });

  it("Запрос на несуществующий документ", async () => {
    await request(app)
      .get("/api/doc/document?id=lcbjh2yIhbwqpSiqEr-Whdad")
      .expect(500);
  });

  it("Поиск документов", async () => {
    await request(app)
      .get("/api/doc/search?query=123&page=1")
      .expect(200, [
        {
          id: "BCtNpjkZ8tQuLEDry7uDH",
          doc_name:
            '"СП 458.1325800.2019. Свод правил. Здания прокуратур. Правила проектирования" (утв. и введен в действие Приказом Минстроя России от 25.11.2019 N 728/пр) - официальный текст документа',
        },
        {
          id: "pn-OUiLpDtf4hh4wZnmPY",
          doc_name:
            'Приказ Минприроды России от 06.06.2017 N 273 "Об утверждении методов расчетов рассеивания выбросов вредных (загрязняющих) веществ в атмосферном воздухе" (Зарегистрировано в Минюсте России 10.08.2017 N 47734) - официальный текст документа',
        },
        {
          id: "c84D2HInGEyXakxZjg4B5",
          doc_name:
            'Приказ МЧС России от 15.01.2020 N 14 "Об утверждении свода правил "Многофункциональные здания. Требования пожарной безопасности" - официальный текст документа',
        },
        {
          id: "8YbdrFdZEPriyVfHMPFZ4",
          doc_name:
            '"ГОСТ 7798-70 (СТ СЭВ 4728-84). Государственный стандарт Союза ССР. Болты с шестигранной головкой класса точности B. Конструкция и размеры" (утв. Постановлением Госстандарта СССР от 04.03.1970 N 270) (ред. от 01.07.1995) - официальный текст документа',
        },
        {
          id: "B5qdcXl853PHFjU-Yp3QO",
          doc_name:
            'Приказ МЧС России от 10.04.2018 N 154 "Об утверждении свода правил "Здания и сооружения для обслуживания автомобилей. Требования пожарной безопасности" (вместе с "СП 364.1311500.2018. Свод правил. Здания и сооружения для обслуживания автомобилей. Требования пожарной безопасности") - официальный текст документа',
        },
        {
          id: "DhQL6AyW_QnHmTAEWRuF7",
          doc_name:
            '"СП 153.13130.2013. Свод правил. Инфраструктура железнодорожного транспорта. Требования пожарной безопасности" (утв. и введен в действие Приказом МЧС России от 25.12.2012 N 804) (ред. от 18.07.2016) - официальный текст документа',
        },
        {
          id: "kWoBtIrt1vGe46sSQCDxL",
          doc_name:
            'Приказ МЧС России от 30.03.2020 N 225 "Об утверждении свода правил СП 8.13130 "Системы противопожарной защиты. Наружное противопожарное водоснабжение. Требования пожарной безопасности" - официальный текст документа',
        },
        {
          id: "jxtKEbjOZDPYJfNKwOv4o",
          doc_name:
            'Федеральный закон от 26.06.2007 N 118-ФЗ (ред. от 30.04.2021) "О внесении изменений в законодательные акты Российской Федерации в части приведения их в соответствие с Земельным кодексом Российской Федерации" - официальный текст документа',
        },
        {
          id: "Uu1zDYBN6-Ocl4OtiqvEk",
          doc_name:
            '"СП 105.13330.2012. Свод правил. Здания и помещения для хранения и переработки сельскохозяйственной продукции. Актуализированная редакция СНиП 2.10.02-84" (утв. Приказом Минрегиона России от 30.06.2012 N 270) (ред. от 18.08.2016) - официальный текст документа',
        },
        {
          id: "DQO3PkIOjsogKVTuRnD59",
          doc_name:
            '"СП 457.1325800.2019. Свод правил. Сооружения спортивные для велосипедного спорта. Правила проектирования" (утв. и введен в действие Приказом Минстроя России от 02.12.2019 N 757/пр) - официальный текст документа',
        },
      ]);
  });
});

describe("Аутентификация", () => {
  describe("Регистрация", () => {
    it("Регистрация с корректными данными", async () => {
      await request(app)
        .post("/api/user/registration")
        .send({
          name: "Евгений",
          password: "123456",
          email: "judge15rus@mail.ru",
        })
        .expect(200);
    });

    it("Регистрация с существующей почтой", async () => {
      await request(app)
        .post("/api/user/registration")
        .send({
          name: "Евгений",
          password: "123456",
          email: "jykaswift@yandex.ru",
        })
        .expect(400);
    });

    it("Регистрация с некорректными данными", async () => {
      await request(app)
        .post("/api/user/registration")
        .send({
          name: "Евгений",
          password: "123456",
          email: "jykaswadsfdaf.ru",
        })
        .expect(400);
    });
  });

  describe("Авторизация", () => {
    it("Авторизация с корректными данными", async () => {
      await request(app)
        .post("/api/user/login")
        .send({
          password: "123456",
          email: "jykaswift@gmail.com",
        })
        .expect(200);
    });

    it("Авторизация с некорректными данными", async () => {
      await request(app)
        .post("/api/user/login")
        .send({
          password: "1234564",
          email: "jykaswift@yandex.ru",
        })
        .expect(400);
    });
  });

  describe("Обновление токена доступа", () => {
    it("Токен валиден", async () => {
      const userWithToken = await UserToken.findOne({
        where: {
          user_id: 2,
        },
      });

      await request(app)
        .post("/api/user/refresh")
        .set("Cookie", [`refreshToken=${userWithToken["refresh_token"]}`])
        .expect(404);
    });

    it("Токен не валиден", async () => {
      await request(app)
        .post("/api/user/refresh")
        .set("Cookie", ["refreshToken"])
        .expect(404);
    });
  });

  describe("Восстановление пароля", () => {
    it("Почта существует", async () => {
      await request(app)
        .post("/api/user/recover")
        .send({ email: "jykaswift@yandex.ru" })
        .expect(200);
    });

    it("Почта не существует", async () => {
      await request(app)
        .post("/api/user/recover")
        .send({ email: "jykassddwift@yandex.ru" })
        .expect(400);
    });
  });

  describe("Выход из аккаунта", () => {
    it("Выход из аккаунта", async () => {
      await request(app)
        .post("/api/user/logout")
        .set("Cookie", ["refreshToken"])
        .expect(500);
    });
  });
});

describe("Личный кабинет", () => {
  let accessToken;
  let userId;
  beforeAll(async () => {
    accessToken = tokenService.generateTokens({ email: "test" }).accessToken;

    const hashPassword = await bcrypt.hash("123456", 5);

    const userAccount = await UserAccount.create({ firstname: "Евгений" });
    await UserLoginInfo.create({
      email: "test@mail.ru",
      password_hash: hashPassword,
      user_id: userAccount.user_id,
    });
    userId = userAccount.user_id;
  });

  afterAll(async () => {
    await Document.destroy({
      where: {
        elastic_id: "3",
      },
    });

    await UserHistory.destroy({
      where: {
        user_id: userId,
      },
    });

    await UserLoginInfo.destroy({
      where: {
        user_id: userId,
      },
    });

    await UserAccount.destroy({
      where: {
        user_id: userId,
      },
    });
  });

  describe("Редактирование профиля", () => {
    it("Неккоректный токен доступа", async () => {
      await request(app)
        .get(`/api/user/data/${userId}`)
        .set("Authorization", `Bearer 123123123123`)
        .expect(401);
    });

    it("Получение информации о профиле", async () => {
      await request(app)
        .get("/api/user/data/1")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
    });

    it("Изменение данных пользователя", async () => {
      await request(app)
        .patch("/api/user/data")
        .send({
          id: userId,
          name: "Евген",
          lastname: "",
          patronymic: "",
          phone: "",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
    });

    it("Изменение данных пользователя - некорректное имя", async () => {
      await request(app)
        .patch("/api/user/data")
        .send({
          id: userId,
          name: "Е",
          lastname: "",
          patronymic: "test",
          phone: "",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(400);
    });

    it("Изменение пароля", async () => {
      await request(app)
        .patch("/api/user/password")
        .send({
          id: userId,
          password: "123456",
          newPassword: "1234567",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);
    });

    it("Изменение пароля - пароли различаются", async () => {
      await request(app)
        .patch("/api/user/password")
        .send({
          id: userId,
          password: "1234565",
          newPassword: "1234567",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(400);
    });

    it("Изменение пароля - новый не соответсвует правилам", async () => {
      await request(app)
        .patch("/api/user/password")
        .send({
          id: userId,
          password: "123456",
          newPassword: "12",
        })
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  describe("История поисковых запросов", () => {
    it("Неккоректный токен доступа", async () => {
      await request(app)
        .get(`/api/user/history`)
        .set("Authorization", `Bearer 123123123123`)
        .expect(401);
    });

    it("Сохранение запроса в БД", async () => {
      await request(app)
        .post("/api/user/history")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          id: userId,
          request: "тест",
          count: "10",
        })
        .expect(200);
    });

    it("Получение списка запросов", async () => {
      await request(app)
        .get(`/api/user/history/?id=${userId}&page=1&limit=10`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          id: userId,
          request: "тест",
          count: "10",
        })
        .expect(200)
        .then((response) => {
          if (response.body.count !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });

    it("Удаление истории", async () => {
      await request(app)
        .delete(`/api/user/history/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          id: userId,
          request: "тест",
          count: "10",
        })
        .expect(200, "1");
    });
  });

  describe("Избранные документы", () => {
    it("Неккоректный токен доступа", async () => {
      await request(app)
        .get(`/api/user/favorite/?id=1&page=1&limit=10`)
        .set("Authorization", `Bearer 123123123123`)
        .expect(401);
    });

    it("Добавление документа в избранное", async () => {
      await request(app)
        .post("/api/user/favorite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          id: userId,
          elasticId: "3",
          name: "kekw",
        })
        .expect(200);
    });

    it("Получение всех избранных документов", async () => {
      await request(app)
        .get(`/api/user/favorite/?id=${userId}&page=1&limit=10`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          if (response.body.count !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });


    it("Находится ли документ в избранных", async () => {
      await request(app)
        .get(`/api/user/favorite/${userId}/3`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200, 'true')
    });


    it("Удаление документа из избранных", async () => {
      await request(app)
        .delete(`/api/user/favorite/${userId}/3`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200, '1')
    });


    it("Удаление всех документов", async () => {
      await request(app)
        .delete(`/api/user/favorite/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200, '0')
    });
  });

  describe("Закладки", () => {
    it("Неккоректный токен доступа", async () => {
      await request(app)
        .get(`/api/user/bookmark/1`)
        .set("Authorization", `Bearer 123123123123`)
        .expect(401);
    });

    it("Добавление закладки в документе", async () => {
      await request(app)
        .post("/api/user/bookmark")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          "userId": userId,
          "docId": "4",
          "docName": "fsdfsa",
          "name": "Закладка",
          "content": "dasfasdfdsafdsafdsafdafdafdasfdasfdsafsadfdfsa",
          "rowStart": 51,
          "rowEnd": 56
        })
        .expect(200);
    });


    it("Получение всех закладок пользователя", async () => {
      await request(app)
        .get(`/api/user/bookmark/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          if (response.body.length !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });

    it("Получение закладок внутри документа", async () => {
      await request(app)
        .get(`/api/user/bookmark/${userId}/4`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          if (response.body.length !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });

    it("Удаление закладок", async () => {
      await request(app)
        .delete(`/api/user/bookmark`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          userId: userId
        })
        .expect(200, '1')
    });
  });


  describe("Папки проектов", () => {
    it("Неккоректный токен доступа", async () => {
      await request(app)
        .get(`/api/user/bookmark/1`)
        .set("Authorization", `Bearer 123123123123`)
        .expect(401);
    });

    it("Добавление документа в папку проекта", async () => {
      await request(app)
        .post("/api/user/bookmark")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          "userId": userId,
          "docId": "4",
          "docName": "fsdfsa",
          "name": "Закладка",
          "content": "dasfasdfdsafdsafdsafdafdafdasfdasfdsafsadfdfsa",
          "rowStart": 51,
          "rowEnd": 56
        })
        .expect(200);
    });


    it("Получение всех папок пользователя", async () => {
      await request(app)
        .get(`/api/user/bookmark/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          if (response.body.length !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });

    it("Удаление проекта", async () => {
      await request(app)
        .get(`/api/user/bookmark/${userId}/4`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((response) => {
          if (response.body.length !== 1) {
            throw new Error(`${response.body.count}`);
          }
        });
    });

  });
});
