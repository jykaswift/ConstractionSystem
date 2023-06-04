import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import styles from "../styles/modules/auth.module.scss";
import {edit} from "../redux/slices/authSlice";
const SuccessConfirmation = () => {
  const { name } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (name) {
      setValue('name', name)
    }
  }, [setValue, name]);

  const onSubmit = async (data) => {
    const response = await dispatch(edit(data));

    if ("error" in response) {
      alert("ERROR")
    } else {
      navigate("/");
    }
  };

  return (
    <div className="content">
      <div className="container">
        <div className={styles.form}>
          <p className={styles.success}>
            Ваша учетная запись была успешно подтверждена
          </p>

          <p className={styles.confirmText}>
            Вы можете указать дополнительную информацию о себе или <span>сразу приступить к работе</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.label}>Имя</p>
            <input
              type="text"
              placeholder={"Введите имя"}
              className={styles.TextField}
              {...register("name", {
                required: "Имя не может быть пустым",
                minLength: {
                  value: 3,
                  message: "Имя должно быть более 3 символов",
                },
              })}
            />
            <p className={styles.serverWarning}>{errors.name?.message}</p>
            <p className={styles.label}>Фамилия</p>

            <input
              type="text"
              placeholder={"Фамилия"}
              className={styles.TextField}
              {...register("lastname")}
            />
            <p className={styles.serverWarning}>{errors.lastname?.message}</p>

            <p className={styles.label}>Отчество</p>
            <input
              type="text"
              placeholder={"Отчество"}
              className={styles.TextField}
              {...register("patronymic")}
            />

            <p className={styles.serverWarning}>{errors.patronymic?.message}</p>

            <p className={styles.label}>Телефон</p>
            <input
              type="text"
              placeholder={"Телефон"}
              className={styles.TextField}
              {...register("phone")}
            />

            <p className={styles.serverWarning}>{errors.phone?.message}</p>

            <button type="submit" className={styles.button}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmation;
