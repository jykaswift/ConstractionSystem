import React, {  useState } from "react";
import styles from "../styles/modules/auth.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {registration, setRegisterData} from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverWarning, setServerWarning] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const response = await dispatch(registration(data));

    if ("error" in response) {
      reset({
        password: "",
        confirm_password: "",
      });

      setServerWarning("Введеный email адрес занят");
    } else {
      dispatch(setRegisterData(data))
      navigate("/confirm");
    }
  };

  return (
    <div data-testid='registerPage' className="content">
      <div className="container">
        <div className={styles.form}>
          <img src="../images/logo/logo.png" className={styles.logo} />
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.serverWarning}>{serverWarning}</p>
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
            <p className={styles.label}>Email</p>
            <input
              type="text"
              placeholder={"Введите email"}
              className={styles.TextField}
              {...register("email", {
                required: "Email не может быть пустым",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный адрес почты",
                },
              })}
            />
            <p className={styles.warning}>{errors.email?.message}</p>
            <p className={styles.label}>Пароль</p>
            <input
              type="password"
              placeholder={"Введите пароль"}
              className={styles.TextField}
              {...register("password", {
                required: "Пароль не может быть пустым",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть более 6 символов",
                },
              })}
            />
            <p className={styles.warning}>{errors.password?.message}</p>
            <p className={styles.label}>Повторите пароль</p>
            <input
              type="password"
              placeholder={"Повторите пароль"}
              className={styles.TextField}
              {...register("confirm_password", {
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Пароли не совпадают";
                  }
                },
              })}
            />
            <p className={styles.warning}>{errors.confirm_password?.message}</p>
            <button type="submit" className={styles.button}>
              Зарегистрироваться
            </button>
          </form>
          <p className={styles.text}>
            Уже зарегистрированы? <span onClick={() => navigate('/login')}>Войти в учетную запись.</span>
          </p>
          <p className={styles.agreement}>
            Нажимая кнопку «Зарегистрироваться» Вы даёте согласие на{" "}
            <span>Обработку своих персональных данных</span> и соглашаетесь с{" "}
            <span>Условиями предоставления услуг.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
