import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import styles from "../styles/modules/auth.module.scss";
import { setAuthBar } from "../redux/slices/authSlice";
import userService from "../services/UserService";

const EditProfile = () => {
  const dispatch = useDispatch()
  const { id, email } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [NotificationPasswordMsg, setNotificationPasswordMsg] = useState({
    isDone: false,
    isError: false,
    message: "",
  });

  const [NotificationDataMsg, setNotificationDataMsg] = useState({
    isDone: false,
    isError: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errors2, isDirty: isDirtyPassword },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    userService.getData(id).then((response) => {
      const data = response.data;
      reset({
        name: data.name,
        lastname: data.lastname,
        patronymic: data.patronymic,
        phone: data.phone,
        email: email,
      });
      setIsLoading(false);
    });
  }, [reset, email, id]);

  async function onSubmitData(data) {
    if (isDirty) {
      // FIXME: Тут передаю id на сервер, возможно это плохо так как redux state можно поменять (вроде как)
      let sendData = data;
      sendData["id"] = id;

      try {
        let response = await userService.changeData(sendData);

        // Делаю ресет всех полей, чтобы кнопка становилась снова неактивной
        reset({
          name: data.name,
          lastname: data.lastname,
          patronymic: data.patronymic,
          phone: data.phone,
          email: email,
        });

        // Обновляю надпись в шапке
        dispatch(setAuthBar(data))

        setNotificationDataMsg({
          isDone: true,
          message: response.data.message,
          isError: false,
        });

      } catch (e) {
        setNotificationDataMsg({
          isDone: true,
          message: e.response.data.message,
          isError: true,
        });
      }
    }
  }

  async function onSubmitPassword(data) {
    if (isDirtyPassword) {
      let sendData = data;
      sendData["id"] = id;

      try {
        let response = await userService.changePassword(sendData);

        setNotificationPasswordMsg({
          isDone: true,
          message: response.data.message,
          isError: false,
        });
      } catch (e) {
        setNotificationPasswordMsg({
          isDone: true,
          message: e.response.data.message,
          isError: true,
        });
      }

      resetPassword();
    }
  }

  return (
    <div className="panels__edit edit">
      <p className="profile__title">Редактировать профиль</p>
      {isLoading ? (
        <p>ЗАГРУЗКА...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmitData)}>
            {NotificationDataMsg.isDone ? (
              <p className={NotificationDataMsg.isError ? "edit__error" : "edit__success"}>
                {NotificationDataMsg.message}
              </p>
            ) : (
              <></>
            )}
            <p className="edit__text">Email</p>
            <input
              type="text"
              disabled={true}
              placeholder={"Email"}
              className={"edit__input"}
              {...register("email")}
            />
            <p className={styles.serverWarning}>{errors.name?.message}</p>

            <p className="edit__text">Имя</p>
            <input
              type="text"
              placeholder={"Введите имя"}
              className={"edit__input"}
              {...register("name", {
                required: "Имя не может быть пустым",
                minLength: {
                  value: 3,
                  message: "Имя должно быть более 3 символов",
                },
              })}
            />
            <p className={styles.serverWarning}>{errors.name?.message}</p>
            <p className="edit__text">Фамилия</p>

            <input
              type="text"
              placeholder={"Фамилия"}
              className={"edit__input"}
              {...register("lastname")}
            />
            <p className={styles.serverWarning}>{errors.lastname?.message}</p>

            <p className="edit__text">Отчество</p>
            <input
              type="text"
              placeholder={"Отчество"}
              className={"edit__input"}
              {...register("patronymic")}
            />

            <p className={styles.serverWarning}>{errors.patronymic?.message}</p>

            <p className="edit__text">Телефон</p>
            <input
              type="text"
              placeholder={"Телефон"}
              className={"edit__input"}
              {...register("phone")}
            />

            <p className={styles.serverWarning}>{errors.phone?.message}</p>

            <button
              type="submit"
              className={"edit__button"}
              disabled={!isDirty}
            >
              Сохранить
            </button>
          </form>
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            {NotificationPasswordMsg.isDone ? (
              <p className={NotificationPasswordMsg.isError ? "edit__error" : "edit__success"}>
                {NotificationPasswordMsg.message}
              </p>
            ) : (
              <></>
            )}

            <p className={"edit__text"}>Текущий пароль</p>
            <input
              type="password"
              placeholder={"Текущий пароль"}
              className={"edit__input"}
              {...registerPassword("password", {
                required: "Пароль не может быть пустым",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть более 6 символов",
                },
              })}
            />
            <p className={styles.warning}>{errors2.password?.message}</p>

            <p className={"edit__text"}>Новый пароль</p>

            <input
              type="password"
              placeholder={"Новый пароль"}
              className={"edit__input"}
              {...registerPassword("newPassword", {
                required: "Пароль не может быть пустым",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть более 6 символов",
                },
              })}
            />

            <p className={styles.warning}>{errors2.newPassword?.message}</p>

            <button
              type="submit"
              className={"edit__button"}
              disabled={!isDirtyPassword}
            >
              Изменить пароль
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProfile;
