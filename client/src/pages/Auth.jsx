import React, {useState} from "react";
import styles from "../styles/modules/auth.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login} from "../redux/slices/authSlice";
import {Link, useNavigate} from "react-router-dom";
import GoogleAuth from "../Components/GoogleAuth";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverWarning, setServerWarning] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const response = await dispatch(login(data));
    if ("error" in response) {
      reset({
        email: "",
        password: "",
      });

      setServerWarning('Неверный логин или пароль')

    } else {
      navigate("/");
    }
  };

  return (
    <div data-testid='authPage' className="content">
      <div className="container">
        <div className={styles.form}>
          <img src="../images/logo/logo.png" className={styles.logo} />
          <h1 className={styles.title}>Авторизация</h1>
          <p className={styles.serverWarning}>{serverWarning}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button type="submit" className={styles.button}>
              Войти
            </button>
          </form>

          <p className={styles.text}>
            Забыли пароль? <span onClick={() => navigate('/recoveryPassword')}>Восстановить пароль</span>
          </p>
          <p className={styles.text}>
            Новый пользователь? <Link className={styles.link} to={'/registration'}>Создать учетную запись</Link>
          </p>

          <GoogleAuth />
          <p className={styles.agreement}>
            Регулируется <span>Условиями предоставления услуг.</span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;
